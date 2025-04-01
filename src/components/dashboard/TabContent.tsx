
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface TabContentProps {
  title: string;
}

const TabContent = ({ title }: TabContentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão {title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Conteúdo da visão {title.toLowerCase()} em construção...</p>
      </CardContent>
    </Card>
  );
};

export default TabContent;
