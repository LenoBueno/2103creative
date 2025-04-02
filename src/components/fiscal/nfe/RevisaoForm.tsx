
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { NFe } from '@/types/nfe';

interface RevisaoFormProps {
  nfe: Partial<NFe>;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const RevisaoForm = ({ nfe, handleChange }: RevisaoFormProps) => {
  const totalItens = nfe.itens?.reduce((total, item) => total + item.valorTotal, 0) || 0;
  
  // Helper function to safely convert modalidade for comparison
  const getModalidadeTransporte = (modalidade: number | string | undefined) => {
    if (modalidade === undefined) return -1;
    return typeof modalidade === 'string' ? parseInt(modalidade, 10) : modalidade;
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium text-lg mb-4">Dados Gerais</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Modelo</span>
              <p className="font-medium">{nfe.modelo === '55' ? 'NF-e (55)' : 'NFC-e (65)'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Série</span>
              <p className="font-medium">{nfe.serie}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Natureza da Operação</span>
              <p className="font-medium">{nfe.naturezaOperacao}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium text-lg mb-4">Destinatário</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">{nfe.destinatario?.tipo === 'CPF' ? 'CPF' : 'CNPJ'}</span>
              <p className="font-medium">{nfe.destinatario?.numero}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Nome / Razão Social</span>
              <p className="font-medium">{nfe.destinatario?.nome}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Inscrição Estadual</span>
              <p className="font-medium">{nfe.destinatario?.inscricaoEstadual || 'ISENTO'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">E-mail</span>
              <p className="font-medium">{nfe.destinatario?.email || '-'}</p>
            </div>
          </div>

          <Separator className="my-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Endereço</span>
              <p className="font-medium">
                {nfe.destinatario?.endereco?.logradouro}, {nfe.destinatario?.endereco?.numero}
                {nfe.destinatario?.endereco?.complemento ? ` - ${nfe.destinatario?.endereco?.complemento}` : ''}
              </p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Bairro</span>
              <p className="font-medium">{nfe.destinatario?.endereco?.bairro}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Cidade/UF</span>
              <p className="font-medium">
                {nfe.destinatario?.endereco?.cidade}/{nfe.destinatario?.endereco?.uf}
              </p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">CEP</span>
              <p className="font-medium">{nfe.destinatario?.endereco?.cep}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium text-lg mb-4">Itens</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>NCM</TableHead>
                  <TableHead className="text-right">Qtde</TableHead>
                  <TableHead className="text-right">Valor Un.</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nfe.itens?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.codigo}</TableCell>
                    <TableCell>{item.descricao}</TableCell>
                    <TableCell>{item.ncm}</TableCell>
                    <TableCell className="text-right">{item.quantidade} {item.unidade}</TableCell>
                    <TableCell className="text-right">
                      {item.valorUnitario?.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.valorTotal?.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={5} className="text-right font-medium">Total:</TableCell>
                  <TableCell className="text-right font-medium">
                    {totalItens?.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {nfe.transporte && nfe.transporte.modalidade !== 9 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium text-lg mb-4">Transporte</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Modalidade</span>
                <p className="font-medium">
                  {getModalidadeTransporte(nfe.transporte?.modalidade) === 0 ? '0 - Por conta do Emitente' :
                   getModalidadeTransporte(nfe.transporte?.modalidade) === 1 ? '1 - Por conta do Destinatário' :
                   getModalidadeTransporte(nfe.transporte?.modalidade) === 2 ? '2 - Por conta de Terceiros' : 
                   '9 - Sem Frete'}
                </p>
              </div>
              {nfe.transporte?.transportadora?.nome && (
                <>
                  <div>
                    <span className="text-sm text-muted-foreground">Transportadora</span>
                    <p className="font-medium">{nfe.transporte?.transportadora?.nome}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">CNPJ</span>
                    <p className="font-medium">{nfe.transporte?.transportadora?.cnpj || '-'}</p>
                  </div>
                </>
              )}
              {nfe.transporte?.veiculo?.placa && (
                <div>
                  <span className="text-sm text-muted-foreground">Veículo</span>
                  <p className="font-medium">{nfe.transporte?.veiculo?.placa} - {nfe.transporte?.veiculo?.uf}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium text-lg mb-4">Pagamento</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Forma de Pagamento</span>
              <p className="font-medium">
                {nfe.pagamento?.forma === '01' ? 'Dinheiro' :
                 nfe.pagamento?.forma === '02' ? 'Cheque' :
                 nfe.pagamento?.forma === '03' ? 'Cartão de Crédito' :
                 nfe.pagamento?.forma === '04' ? 'Cartão de Débito' :
                 nfe.pagamento?.forma === '05' ? 'Crédito Loja' :
                 nfe.pagamento?.forma === '10' ? 'Vale Alimentação' :
                 nfe.pagamento?.forma === '15' ? 'Boleto Bancário' :
                 nfe.pagamento?.forma === '90' ? 'Sem Pagamento' : 'Outros'}
              </p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Valor</span>
              <p className="font-medium">
                {totalItens?.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </p>
            </div>
          </div>

          {nfe.pagamento?.parcelas && nfe.pagamento?.parcelas.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Parcelas</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nfe.pagamento?.parcelas.map((parcela, index) => (
                    <TableRow key={index}>
                      <TableCell>{parcela.numero}</TableCell>
                      <TableCell>
                        {new Date(parcela.vencimento).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        {parcela.valor?.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Label htmlFor="informacoesAdicionais" className="mb-2">Informações Adicionais</Label>
          <Textarea
            id="informacoesAdicionais"
            name="informacoesAdicionais"
            value={nfe.informacoesAdicionais || ''}
            onChange={handleChange}
            placeholder="Informações complementares da Nota Fiscal"
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RevisaoForm;
