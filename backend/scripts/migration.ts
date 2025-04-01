
import mysql from 'mysql2/promise';
import { env } from '../src/config/env';

const createTables = async () => {
  const connection = await mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
  });

  try {
    // Cria o banco se não existir
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${env.DB_NAME}`);
    await connection.query(`USE ${env.DB_NAME}`);
    
    console.log(`✅ Banco de dados '${env.DB_NAME}' selecionado ou criado`);

    // Tabela de Usuários
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'user',
        active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabela de usuários criada/verificada');

    // Tabela de Contas Contábeis
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contas_contabeis (
        id INT AUTO_INCREMENT PRIMARY KEY,
        codigo VARCHAR(20) NOT NULL UNIQUE,
        descricao VARCHAR(100) NOT NULL,
        tipo VARCHAR(50) NOT NULL,
        natureza ENUM('devedora', 'credora') NOT NULL,
        pai_id INT NULL,
        saldo DECIMAL(15,2) NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (pai_id) REFERENCES contas_contabeis(id) ON DELETE SET NULL
      )
    `);
    console.log('✅ Tabela de contas contábeis criada/verificada');

    // Tabela de Lançamentos
    await connection.query(`
      CREATE TABLE IF NOT EXISTS lancamentos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        data DATE NOT NULL,
        documento VARCHAR(50) NOT NULL,
        conta_id INT NOT NULL,
        descricao VARCHAR(255) NOT NULL,
        debito DECIMAL(15,2) NOT NULL DEFAULT 0,
        credito DECIMAL(15,2) NOT NULL DEFAULT 0,
        valor DECIMAL(15,2) NOT NULL,
        tipo ENUM('receita', 'despesa', 'transferencia') NOT NULL,
        status ENUM('pendente', 'confirmado', 'cancelado') NOT NULL DEFAULT 'pendente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (conta_id) REFERENCES contas_contabeis(id)
      )
    `);
    console.log('✅ Tabela de lançamentos criada/verificada');

    // Tabela de Clientes
    await connection.query(`
      CREATE TABLE IF NOT EXISTS clientes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        codigo VARCHAR(20) NOT NULL UNIQUE,
        nome VARCHAR(100) NOT NULL,
        cnpj_cpf VARCHAR(20) NOT NULL,
        email VARCHAR(100),
        telefone VARCHAR(20),
        contato_nome VARCHAR(100),
        contato_telefone VARCHAR(20),
        cidade VARCHAR(100) NOT NULL,
        uf CHAR(2) NOT NULL,
        cep VARCHAR(10),
        score ENUM('A+', 'A', 'B', 'C', 'D') NOT NULL DEFAULT 'C',
        valor_total DECIMAL(15,2) NOT NULL DEFAULT 0,
        data_cadastro DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabela de clientes criada/verificada');

    // Tabela de Produtos
    await connection.query(`
      CREATE TABLE IF NOT EXISTS produtos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        codigo VARCHAR(20) NOT NULL UNIQUE,
        descricao VARCHAR(100) NOT NULL,
        categoria VARCHAR(50) NOT NULL,
        unidade VARCHAR(10) NOT NULL,
        preco_venda DECIMAL(15,2) NOT NULL,
        preco_custo DECIMAL(15,2) NOT NULL,
        estoque_atual DECIMAL(15,2) NOT NULL DEFAULT 0,
        estoque_minimo DECIMAL(15,2) NOT NULL DEFAULT 0,
        estoque_maximo DECIMAL(15,2) NOT NULL DEFAULT 0,
        ativo BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabela de produtos criada/verificada');

    // Tabela de Pedidos
    await connection.query(`
      CREATE TABLE IF NOT EXISTS pedidos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        numero VARCHAR(20) NOT NULL UNIQUE,
        data DATE NOT NULL,
        cliente_id INT NOT NULL,
        valor_total DECIMAL(15,2) NOT NULL DEFAULT 0,
        status ENUM('novo', 'aprovado', 'em_separacao', 'faturado', 'concluido', 'cancelado') NOT NULL DEFAULT 'novo',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
      )
    `);
    console.log('✅ Tabela de pedidos criada/verificada');

    // Tabela de Itens de Pedido
    await connection.query(`
      CREATE TABLE IF NOT EXISTS pedido_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        pedido_id INT NOT NULL,
        produto_id INT NOT NULL,
        descricao VARCHAR(100) NOT NULL,
        quantidade DECIMAL(15,2) NOT NULL,
        valor_unitario DECIMAL(15,2) NOT NULL,
        valor_total DECIMAL(15,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
        FOREIGN KEY (produto_id) REFERENCES produtos(id)
      )
    `);
    console.log('✅ Tabela de itens de pedido criada/verificada');

    // Tabela de Ordens de Produção
    await connection.query(`
      CREATE TABLE IF NOT EXISTS producao_ordens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        numero VARCHAR(20) NOT NULL UNIQUE,
        produto_id INT NOT NULL,
        produto_descricao VARCHAR(100) NOT NULL,
        quantidade DECIMAL(15,2) NOT NULL,
        quantidade_produzida DECIMAL(15,2) NOT NULL DEFAULT 0,
        data_inicio DATE NOT NULL,
        data_fim DATE NOT NULL,
        status ENUM('pendente', 'em_producao', 'concluida', 'cancelada') NOT NULL DEFAULT 'pendente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (produto_id) REFERENCES produtos(id)
      )
    `);
    console.log('✅ Tabela de ordens de produção criada/verificada');

    console.log('✅ Todas as tabelas foram criadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro na criação das tabelas:', error);
    throw error;
  } finally {
    await connection.end();
  }
};

createTables()
  .then(() => {
    console.log('✅ Migração concluída com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erro na migração:', error);
    process.exit(1);
  });
