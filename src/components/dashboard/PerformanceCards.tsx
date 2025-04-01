
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const PerformanceCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 45.231,89</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="flex items-center text-green-500 mr-1">+20.1%</span> em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">356</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="flex items-center text-green-500 mr-1">+12%</span> em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2.103</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="flex items-center text-green-500 mr-1">+5%</span> em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">98%</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="flex items-center text-green-500 mr-1">+2%</span> em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceCards;
