import { useState } from 'react';
import { BarChart3, Download, PieChart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Mock data for balance sheet
const balanceSheetData = {
  assets: [
    { account: '1.1 - Caixa', value: 124500 },
    { account: '1.2 - Bancos', value: 258730 },
    { account: '1.3 - Contas a Receber', value: 154800 },
    { account: '1.4 - Estoques', value: 89750 },
    { account: '1.5 - Outros Ativos Circulantes', value: 12500 },
    { account: '2.1 - Imobilizado', value: 456200 },
    { account: '2.2 - Intangível', value: 78000 },
  ],
  liabilities: [
    { account: '3.1 - Fornecedores', value: 87650 },
    { account: '3.2 - Salários a Pagar', value: 58900 },
    { account: '3.3 - Impostos a Recolher', value: 46800 },
    { account: '3.4 - Empréstimos de Curto Prazo', value: 125000 },
    { account: '4.1 - Empréstimos de Longo Prazo', value: 245000 },
  ],
  equity: [
    { account: '5.1 - Capital Social', value: 350000 },
    { account: '5.2 - Reservas', value: 125000 },
    { account: '5.3 - Lucros Acumulados', value: 136130 },
  ]
};

// Mock data for income statement
const incomeStatementData = {
  revenue: [
    { account: '6.1 - Receita de Vendas', value: 987650 },
    { account: '6.2 - Receitas Financeiras', value: 24520 },
    { account: '6.3 - Outras Receitas', value: 12780 },
  ],
  expenses: [
    { account: '7.1 - Custo dos Produtos Vendidos', value: 487200 },
    { account: '7.2 - Despesas com Pessoal', value: 184500 },
    { account: '7.3 - Despesas Administrativas', value: 98750 },
    { account: '7.4 - Despesas de Marketing', value: 56800 },
    { account: '7.5 - Despesas Financeiras', value: 32540 },
    { account: '7.6 - Impostos e Taxas', value: 29030 },
  ],
};

// Mock data for cash flow
const cashFlowData = {
  operating: [
    { description: 'Lucro Líquido', value: 136130 },
    { description: 'Depreciação e Amortização', value: 45000 },
    { description: 'Aumento em Contas a Receber', value: -75800 },
    { description: 'Aumento em Estoques', value: -25400 },
    { description: 'Aumento em Fornecedores', value: 35600 },
    { description: 'Outros Ajustes Operacionais', value: 12500 },
  ],
  investing: [
    { description: 'Aquisição de Ativo Imobilizado', value: -120000 },
    { description: 'Venda de Ativo Imobilizado', value: 25000 },
    { description: 'Investimentos em Intangíveis', value: -15000 },
  ],
  financing: [
    { description: 'Novos Empréstimos', value: 150000 },
    { description: 'Pagamento de Empréstimos', value: -80000 },
    { description: 'Distribuição de Dividendos', value: -45000 },
  ],
};

// Financial indicators
const financialIndicators = [
  { name: 'Liquidez Corrente', value: 2.4, status: 'positive' },
  { name: 'Liquidez Seca', value: 1.9, status: 'positive' },
  { name: 'Margem de Lucro', value: 13.8, unit: '%', status: 'neutral' },
  { name: 'ROE', value: 22.3, unit: '%', status: 'positive' },
  { name: 'Endividamento', value: 45.2, unit: '%', status: 'neutral' },
  { name: 'Giro de Estoque', value: 5.4, status: 'positive' },
];

const AccountingReports = () => {
  const [period, setPeriod] = useState('year2025');
  const [reportType, setReportType] = useState('balanceSheet');

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  // Calculate totals
  const totalAssets = balanceSheetData.assets.reduce((sum, item) => sum + item.value, 0);
  const totalLiabilities = balanceSheetData.liabilities.reduce((sum, item) => sum + item.value, 0);
  const totalEquity = balanceSheetData.equity.reduce((sum, item) => sum + item.value, 0);
  
  const totalRevenue = incomeStatementData.revenue.reduce((sum, item) => sum + item.value, 0);
  const totalExpenses = incomeStatementData.expenses.reduce((sum, item) => sum + item.value, 0);
  const netIncome = totalRevenue - totalExpenses;
  
  const totalOperating = cashFlowData.operating.reduce((sum, item) => sum + item.value, 0);
  const totalInvesting = cashFlowData.investing.reduce((sum, item) => sum + item.value, 0);
  const totalFinancing = cashFlowData.financing.reduce((sum, item) => sum + item.value, 0);
  const netCashFlow = totalOperating + totalInvesting + totalFinancing;

  // Function to render sections of financial statements with items and totals
  const renderFinancialSection = (title: string, items: any[], total: number) => (
    <div className="mb-6">
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      {items.map((item, index) => (
        <div key={index} className="flex justify-between py-1 border-b border-dashed border-gray-200">
          <span className="text-sm">{item.account || item.description}</span>
          <span className="text-sm font-medium">{formatCurrency(item.value)}</span>
        </div>
      ))}
      <div className="flex justify-between py-2 font-semibold mt-1">
        <span>Total {title}</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Relatórios Contábeis</h2>
          <p className="text-muted-foreground">
            Visualize os principais relatórios financeiros da empresa.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="period" className="whitespace-nowrap">Período:</Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger id="period" className="w-[180px]">
                <SelectValue placeholder="Selecionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="year2025">Ano 2025</SelectItem>
                <SelectItem value="q12025">1º Trimestre 2025</SelectItem>
                <SelectItem value="q22025">2º Trimestre 2025</SelectItem>
                <SelectItem value="q32025">3º Trimestre 2025</SelectItem>
                <SelectItem value="q42025">4º Trimestre 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {financialIndicators.map((indicator, index) => (
          <Card key={index} className="shadow-sm">
            <CardHeader className="py-4">
              <CardTitle className="text-base">{indicator.name}</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-2xl font-bold flex items-center">
                {indicator.value}
                {indicator.unit && <span className="ml-1 text-lg">{indicator.unit}</span>}
                <span className={`ml-2 text-sm font-normal ${
                  indicator.status === 'positive' ? 'text-green-500' : 
                  indicator.status === 'negative' ? 'text-red-500' : 
                  'text-yellow-500'
                }`}>
                  {indicator.status === 'positive' ? '↑' : 
                   indicator.status === 'negative' ? '↓' : '→'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-6">
          <Tabs value={reportType} onValueChange={setReportType} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="balanceSheet" className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                Balanço Patrimonial
              </TabsTrigger>
              <TabsTrigger value="incomeStatement" className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                DRE
              </TabsTrigger>
              <TabsTrigger value="cashFlow" className="flex items-center gap-1">
                <PieChart className="h-4 w-4" />
                Fluxo de Caixa
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="balanceSheet" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {renderFinancialSection('Ativos', balanceSheetData.assets, totalAssets)}
                </div>
                <div>
                  {renderFinancialSection('Passivos', balanceSheetData.liabilities, totalLiabilities)}
                  {renderFinancialSection('Patrimônio Líquido', balanceSheetData.equity, totalEquity)}
                  
                  <div className="mt-6 pt-4 border-t-2 border-gray-300">
                    <div className="flex justify-between font-bold">
                      <span>Total Passivo + PL</span>
                      <span>{formatCurrency(totalLiabilities + totalEquity)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="incomeStatement" className="mt-0">
              <div className="max-w-3xl mx-auto">
                {renderFinancialSection('Receitas', incomeStatementData.revenue, totalRevenue)}
                {renderFinancialSection('Despesas', incomeStatementData.expenses, totalExpenses)}
                
                <div className="mt-6 pt-4 border-t-2 border-gray-300">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Resultado Líquido</span>
                    <span className={netIncome >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {formatCurrency(netIncome)}
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="cashFlow" className="mt-0">
              <div className="max-w-3xl mx-auto">
                {renderFinancialSection('Fluxo Operacional', cashFlowData.operating, totalOperating)}
                {renderFinancialSection('Fluxo de Investimentos', cashFlowData.investing, totalInvesting)}
                {renderFinancialSection('Fluxo de Financiamento', cashFlowData.financing, totalFinancing)}
                
                <div className="mt-6 pt-4 border-t-2 border-gray-300">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Fluxo de Caixa Líquido</span>
                    <span className={netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {formatCurrency(netCashFlow)}
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountingReports;
