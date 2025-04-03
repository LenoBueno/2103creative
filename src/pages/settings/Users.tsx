
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
};

const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@exemplo.com',
    role: 'Administrador',
    lastLogin: '2023-06-15 14:30',
  },
  {
    id: '2',
    name: 'Maria Souza',
    email: 'maria.souza@exemplo.com',
    role: 'Gestor',
    lastLogin: '2023-06-15 10:15',
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos@exemplo.com',
    role: 'Vendedor',
    lastLogin: '2023-06-14 16:45',
  },
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState<User[]>(mockUsers);

  const filteredUsers = users.filter(
    user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Gerenciamento de Usuários</CardTitle>
        <Button size="sm" className="ml-auto gap-1">
          <Plus size={16} />
          Novo Usuário
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Último Acesso</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil size={16} />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    Nenhum usuário encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Users;
