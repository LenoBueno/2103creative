
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { NFe } from '@/types/nfe';

interface RevisaoFormProps {
  nfe: Partial<NFe>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

// Helper function to safely compare string or number types
const isSameValue = (a: string | number, b: string | number): boolean => {
  return String(a) === String(b);
};

const RevisaoForm = ({ nfe, handleChange }: RevisaoFormProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Dados da Nota</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Natureza da Operação</Label>
              <p className="text-gray-700 p-2 border rounded-md bg-gray-50">
                {nfe.naturezaOperacao || ''}
              </p>
            </div>
            <div>
              <Label>Modelo</Label>
              <p className="text-gray-700 p-2 border rounded-md bg-gray-50">
                {nfe.modelo === '55' ? 'NF-e (55)' : nfe.modelo === '65' ? 'NFC-e (65)' : ''}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Emitente</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>CNPJ</Label>
              <p className="text-gray-700 p-2 border rounded-md bg-gray-50">
                {nfe.emitente?.cnpj || ''}
              </p>
            </div>
            <div>
              <Label>Nome</Label>
              <p className="text-gray-700 p-2 border rounded-md bg-gray-50">
                {nfe.emitente?.nome || ''}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Destinatário</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{nfe.destinatario?.tipo || 'Documento'}</Label>
              <p className="text-gray-700 p-2 border rounded-md bg-gray-50">
                {nfe.destinatario?.numero || ''}
              </p>
            </div>
            <div>
              <Label>Nome</Label>
              <p className="text-gray-700 p-2 border rounded-md bg-gray-50">
                {nfe.destinatario?.nome || ''}
              </p>
            </div>
            <div>
              <Label>Endereço</Label>
              <p className="text-gray-700 p-2 border rounded-md bg-gray-50">
                {nfe.destinatario?.endereco ? 
                  `${nfe.destinatario.endereco.logradouro}, ${nfe.destinatario.endereco.numero} - ${nfe.destinatario.endereco.bairro}, ${nfe.destinatario.endereco.cidade}/${nfe.destinatario.endereco.uf}`
                  : ''}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Itens</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Código</th>
                  <th className="px-4 py-2 text-left">Descrição</th>
                  <th className="px-4 py-2 text-right">Quant.</th>
                  <th className="px-4 py-2 text-right">V. Unit.</th>
                  <th className="px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {nfe.itens && nfe.itens.map((item, index) => (
                  <tr key={item.id || index} className="border-b border-gray-200">
                    <td className="px-4 py-2">{item.codigo}</td>
                    <td className="px-4 py-2">{item.descricao}</td>
                    <td className="px-4 py-2 text-right">{item.quantidade}</td>
                    <td className="px-4 py-2 text-right">
                      {item.valorUnitario.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {item.valorTotal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-medium">
                  <td colSpan={4} className="px-4 py-2 text-right">
                    Total:
                  </td>
                  <td className="px-4 py-2 text-right">
                    {(nfe.itens?.reduce((acc, item) => acc + item.valorTotal, 0) || 0).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Transporte</h3>
          <div>
            <Label>Modalidade do Frete</Label>
            <p className="text-gray-700 p-2 border rounded-md bg-gray-50">
              {isSameValue(nfe.transporte?.modalidade, 0) && 'Por conta do Remetente (CIF)'}
              {isSameValue(nfe.transporte?.modalidade, 1) && 'Por conta do Destinatário (FOB)'}
              {isSameValue(nfe.transporte?.modalidade, 2) && 'Por conta de Terceiros'}
              {isSameValue(nfe.transporte?.modalidade, 9) && 'Sem Frete'}
              {nfe.transporte?.modalidade === undefined && ''}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Pagamento</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Forma de Pagamento</Label>
              <p className="text-gray-700 p-2 border rounded-md bg-gray-50">
                {nfe.pagamento?.forma === '01' && 'Dinheiro'}
                {nfe.pagamento?.forma === '02' && 'Cheque'}
                {nfe.pagamento?.forma === '03' && 'Cartão de Crédito'}
                {nfe.pagamento?.forma === '04' && 'Cartão de Débito'}
                {nfe.pagamento?.forma === '05' && 'Crédito Loja'}
                {nfe.pagamento?.forma === '10' && 'Vale Alimentação'}
                {nfe.pagamento?.forma === '15' && 'Boleto Bancário'}
                {nfe.pagamento?.forma === '90' && 'Sem Pagamento'}
                {!nfe.pagamento?.forma && ''}
              </p>
            </div>
            <div>
              <Label>Valor Total</Label>
              <p className="text-gray-700 p-2 border rounded-md bg-gray-50">
                {(nfe.pagamento?.valor || 0).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </p>
            </div>
          </div>
          
          {nfe.pagamento?.parcelas && nfe.pagamento.parcelas.length > 0 && (
            <div className="mt-4">
              <Label>Parcelas</Label>
              <div className="overflow-x-auto mt-1">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Número</th>
                      <th className="px-4 py-2 text-left">Vencimento</th>
                      <th className="px-4 py-2 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nfe.pagamento.parcelas.map((parcela, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="px-4 py-2">{parcela.numero}</td>
                        <td className="px-4 py-2">{parcela.vencimento}</td>
                        <td className="px-4 py-2 text-right">
                          {parcela.valor.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Informações Adicionais</h3>
          <Textarea
            name="informacoesAdicionais"
            value={nfe.informacoesAdicionais || ''}
            onChange={handleChange}
            placeholder="Informações complementares da nota fiscal"
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RevisaoForm;
