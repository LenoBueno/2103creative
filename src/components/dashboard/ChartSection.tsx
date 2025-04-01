
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { BarChart3, PieChart } from 'lucide-react';

const ChartSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="col-span-1 h-[350px] hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center">
            <BarChart3 size={16} className="mr-2" />
            Desempenho Mensal
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Gráfico de Desempenho</p>
        </CardContent>
      </Card>
      
      <Card className="col-span-1 h-[350px] hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center">
            <PieChart size={16} className="mr-2" />
            Distribuição de Vendas
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Gráfico de Distribuição</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartSection;
