
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Pen, Trash2 } from 'lucide-react';

const CustomersTable = () => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Nome / Razão Social</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Cidade/UF</TableHead>
            <TableHead>Score</TableHead>
            <TableHead className="text-right">Valor Total</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>C-0001</TableCell>
            <TableCell>
              <div>
                <p className="font-medium">Empresa ABC Ltda</p>
                <p className="text-xs text-muted-foreground">11.222.333/0001-44</p>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <p>João Silva</p>
                <p className="text-xs text-muted-foreground">(11) 98765-4321</p>
              </div>
            </TableCell>
            <TableCell>São Paulo/SP</TableCell>
            <TableCell>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                <span>A+</span>
              </div>
            </TableCell>
            <TableCell className="text-right">R$ 156.430,00</TableCell>
            <TableCell>
              <div className="flex items-center justify-center space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pen className="h-4 w-4 text-gray-700" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>C-0002</TableCell>
            <TableCell>
              <div>
                <p className="font-medium">Comércio XYZ Eireli</p>
                <p className="text-xs text-muted-foreground">33.444.555/0001-66</p>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <p>Maria Santos</p>
                <p className="text-xs text-muted-foreground">(21) 98765-1234</p>
              </div>
            </TableCell>
            <TableCell>Rio de Janeiro/RJ</TableCell>
            <TableCell>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                <span>B</span>
              </div>
            </TableCell>
            <TableCell className="text-right">R$ 78.950,00</TableCell>
            <TableCell>
              <div className="flex items-center justify-center space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pen className="h-4 w-4 text-gray-700" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>C-0003</TableCell>
            <TableCell>
              <div>
                <p className="font-medium">Indústria 123 S/A</p>
                <p className="text-xs text-muted-foreground">55.666.777/0001-88</p>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <p>Carlos Oliveira</p>
                <p className="text-xs text-muted-foreground">(31) 99876-5432</p>
              </div>
            </TableCell>
            <TableCell>Belo Horizonte/MG</TableCell>
            <TableCell>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                <span>C</span>
              </div>
            </TableCell>
            <TableCell className="text-right">R$ 45.780,00</TableCell>
            <TableCell>
              <div className="flex items-center justify-center space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pen className="h-4 w-4 text-gray-700" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomersTable;
