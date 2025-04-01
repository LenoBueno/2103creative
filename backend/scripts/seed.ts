
import mysql from 'mysql2/promise';
import { env } from '../src/config/env';
import bcrypt from 'bcrypt';

const seedDatabase = async () => {
  const connection = await mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  });

  try {
    console.log('🌱 Iniciando seed do banco de dados...');

    // Seed de usuário admin
    const hashedPassword = await bcrypt.hash('123456', 10);
    await connection.query(`
      INSERT INTO users (username, email, password, name, role, active)
      VALUES ('admin', 'admin@2103creative.com', ?, 'Administrador', 'admin', 1)
      ON DUPLICATE KEY UPDATE
      email = VALUES(email)
    `, [hashedPassword]);
    console.log('✅ Usuário admin criado/atualizado');

    // Seed de contas contábeis
    await connection.query(`
      INSERT INTO contas_contabeis (codigo, descricao, tipo, natureza)
      VALUES 
      ('1.1.1', 'Caixa', 'Ativo Circulante', 'devedora'),
      ('1.1.2', 'Bancos', 'Ativo Circulante', 'devedora'),
      ('2.1.1', 'Fornecedores', 'Passivo Circulante', 'credora'),
      ('3.1.1', 'Receita de Vendas', 'Receita', 'credora'),
      ('4.1.1', 'Custos de Produtos', 'Despesa', 'devedora'),
      ('5.1.1', 'Despesas Operacionais', 'Despesa', 'devedora')
      ON DUPLICATE KEY UPDATE
      descricao = VALUES(descricao)
    `);
    console.log('✅ Contas contábeis básicas criadas/atualizadas');

    // Seed de clientes
    await connection.query(`
      INSERT INTO clientes (codigo, nome, cnpj_cpf, email, telefone, cidade, uf, score, data_cadastro)
      VALUES 
      ('C-0001', 'Empresa ABC Ltda', '11.222.333/0001-44', 'contato@abc.com', '(11) 98765-4321', 'São Paulo', 'SP', 'A+', CURDATE()),
      ('C-0002', 'Comércio XYZ Eireli', '33.444.555/0001-66', 'comercial@xyz.com', '(21) 98765-1234', 'Rio de Janeiro', 'RJ', 'B', CURDATE()),
      ('C-0003', 'Indústria 123 S/A', '55.666.777/0001-88', 'vendas@ind123.com', '(31) 99876-5432', 'Belo Horizonte', 'MG', 'C', CURDATE())
      ON DUPLICATE KEY UPDATE
      nome = VALUES(nome)
    `);
    console.log('✅ Clientes de exemplo criados/atualizados');

    // Seed de produtos
    await connection.query(`
      INSERT INTO produtos (codigo, descricao, categoria, unidade, preco_venda, preco_custo, estoque_atual, estoque_minimo, estoque_maximo)
      VALUES 
      ('P001', 'Argila Especial', 'Matéria-Prima', 'kg', 5.00, 3.50, 2500, 1000, 5000),
      ('P002', 'Esmalte Branco', 'Insumos', 'L', 25.00, 17.50, 350, 200, 800),
      ('P003', 'Porcelanato 60x60', 'Produto Acabado', 'm²', 120.00, 75.00, 850, 300, 1200),
      ('P004', 'Azulejo 30x40', 'Produto Acabado', 'm²', 85.00, 55.00, 1200, 500, 2000),
      ('P005', 'Porcelanato Cinza 60x60', 'Produto Acabado', 'm²', 115.00, 70.00, 750, 300, 1200),
      ('P006', 'Revestimento Bege 30x60', 'Produto Acabado', 'm²', 95.00, 60.00, 980, 400, 1500)
      ON DUPLICATE KEY UPDATE
      descricao = VALUES(descricao)
    `);
    console.log('✅ Produtos de exemplo criados/atualizados');

    // Seed de ordem de produção
    await connection.query(`
      INSERT INTO producao_ordens (numero, produto_id, produto_descricao, quantidade, quantidade_produzida, data_inicio, data_fim, status)
      SELECT 'PO10023', id, 'Porcelanato Cinza 60x60', 1500, 950, DATE_SUB(CURDATE(), INTERVAL 5 DAY), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 'em_producao'
      FROM produtos WHERE codigo = 'P005'
      ON DUPLICATE KEY UPDATE
      produto_descricao = VALUES(produto_descricao)
    `);
    
    await connection.query(`
      INSERT INTO producao_ordens (numero, produto_id, produto_descricao, quantidade, quantidade_produzida, data_inicio, data_fim, status)
      SELECT 'PO10024', id, 'Revestimento Bege 30x60', 2000, 2000, DATE_SUB(CURDATE(), INTERVAL 10 DAY), DATE_SUB(CURDATE(), INTERVAL 2 DAY), 'concluida'
      FROM produtos WHERE codigo = 'P006'
      ON DUPLICATE KEY UPDATE
      produto_descricao = VALUES(produto_descricao)
    `);
    console.log('✅ Ordens de produção de exemplo criadas/atualizadas');

    console.log('✅ Seed concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    throw error;
  } finally {
    await connection.end();
  }
};

seedDatabase()
  .then(() => {
    console.log('✅ Seed concluído com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erro no seed:', error);
    process.exit(1);
  });
