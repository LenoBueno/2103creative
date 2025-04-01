
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const AlertsSection = () => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          Alertas Prioritários
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-100 dark:border-red-900/30 flex items-center hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
            <div>
              <p className="text-sm font-medium">Estoque crítico: Produto XYZ-123</p>
              <p className="text-xs text-muted-foreground">Quantidade disponível: 2 unidades</p>
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md border border-amber-100 dark:border-amber-900/30 flex items-center hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
            <div className="w-2 h-2 rounded-full bg-amber-500 mr-3"></div>
            <div>
              <p className="text-sm font-medium">Fatura vencida: Cliente ABC Ltda</p>
              <p className="text-xs text-muted-foreground">Valor: R$ 5.230,00 - Vencida há 5 dias</p>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-100 dark:border-blue-900/30 flex items-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
            <div>
              <p className="text-sm font-medium">Reunião programada: Equipe de Vendas</p>
              <p className="text-xs text-muted-foreground">Hoje às 15:00 - Sala de Conferência</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsSection;
