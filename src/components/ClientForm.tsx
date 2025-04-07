import React, { useState } from 'react';

const ClientForm = () => {
  const [isActive, setIsActive] = useState(true);
  const [tipoUsuario, setTipoUsuario] = useState('fisica');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Novo Cliente
        </h1>
        <div className="flex items-center gap-2">
          <label htmlFor="isActive" className="cursor-pointer">
            {isActive ? "Ativo" : "Inativo"}
          </label>
          <input 
            type="checkbox" 
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </div>
      </div>

      <form className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium mb-4">Ficha Cadastral</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Tipo de Pessoa
            </label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="tipoUsuario"
                  value="fisica"
                  checked={tipoUsuario === 'fisica'}
                  onChange={() => setTipoUsuario('fisica')}
                />
                <span className="ml-2">Física</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="tipoUsuario"
                  value="juridica"
                  checked={tipoUsuario === 'juridica'}
                  onChange={() => setTipoUsuario('juridica')}
                />
                <span className="ml-2">Jurídica</span>
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                id="nome"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label htmlFor="sobrenome" className="block text-sm font-medium mb-1">Sobrenome</label>
              <input
                type="text"
                id="sobrenome"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label htmlFor="cpf" className="block text-sm font-medium mb-1">CPF</label>
              <input
                type="text"
                id="cpf"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="000.000.000-00"
              />
            </div>
            
            <div>
              <label htmlFor="rg" className="block text-sm font-medium mb-1">RG</label>
              <input
                type="text"
                id="rg"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="00.000.000-0"
              />
            </div>
            
            <div>
              <label htmlFor="orgaoExpedidor" className="block text-sm font-medium mb-1">Órgão Expedidor</label>
              <input
                type="text"
                id="orgaoExpedidor"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="SSP"
              />
            </div>
            
            <div>
              <label htmlFor="uf" className="block text-sm font-medium mb-1">UF</label>
              <select
                id="uf"
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Selecione</option>
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AP">AP</option>
                <option value="AM">AM</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MT">MT</option>
                <option value="MS">MS</option>
                <option value="MG">MG</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PR">PR</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SP">SP</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="genero" className="block text-sm font-medium mb-1">Gênero</label>
              <select
                id="genero"
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dataNascimento" className="block text-sm font-medium mb-1">Data de Nascimento</label>
              <input
                type="date"
                id="dataNascimento"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium mb-1">Telefone</label>
              <input
                type="tel"
                id="telefone"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="(00) 0000-0000"
              />
            </div>
            
            <div>
              <label htmlFor="celular" className="block text-sm font-medium mb-1">Celular</label>
              <input
                type="tel"
                id="celular"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="(00) 00000-0000"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="email@exemplo.com"
              />
            </div>
            
            <div>
              <label htmlFor="website" className="block text-sm font-medium mb-1">Website</label>
              <input
                type="url"
                id="website"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="www.exemplo.com.br"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label htmlFor="observacao" className="block text-sm font-medium mb-1">Observação</label>
            <textarea
              id="observacao"
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
              placeholder="Observações sobre o cliente..."
            ></textarea>
          </div>
          
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ClientForm; 