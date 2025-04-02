
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Filter, ImageIcon, Info, Package, Plus, Search, FileText, 
  Edit, Trash2, Eye, MoreHorizontal, X
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import ItemForm from '@/components/inventory/ItemForm';
import { useToast } from '@/hooks/use-toast';
import { Produto } from '@/types/produto';

// Mock items com estrutura fiscal
const mockItems: Produto[] = [
  {
    id: '1',
    codigo: 'P-0001',
    descricao: 'Notebook Pro X5',
    detalhes: 'Intel i7, 16GB, SSD 512GB',
    unidade: 'UN',
    grupo: 'Informática',
    estoque: 25,
    valor: 5490.00,
    estoque_status: 'high',
    preco: 5490.00,
    ncm: '8471.30.19',
    origem: '0',
    impostos: {
      icms: {
        cst: '00',
        aliquota: 18,
      },
      pis: {
        cst: '01',
        aliquota: 1.65
      },
      cofins: {
        cst: '01',
        aliquota: 7.6
      }
    },
    configEstado: {
      RS: {
        difal: true,
        aliquotaInterna: 18
      }
    }
  },
  {
    id: '2',
    codigo: 'P-0002',
    descricao: 'Monitor LED 24"',
    detalhes: 'Full HD, HDMI, DP',
    unidade: 'UN',
    grupo: 'Informática',
    estoque: 8,
    valor: 890.00,
    estoque_status: 'medium',
    preco: 890.00,
    ncm: '8528.52.20',
    origem: '0',
    impostos: {
      icms: {
        cst: '00',
        aliquota: 18,
      },
      pis: {
        cst: '01',
        aliquota: 1.65
      },
      cofins: {
        cst: '01',
        aliquota: 7.6
      }
    },
    configEstado: {
      RS: {
        difal: true,
        aliquotaInterna: 18
      }
    }
  },
  {
    id: '3',
    codigo: 'P-0003',
    descricao: 'Impressora Laser',
    detalhes: 'Wi-Fi, Duplex, 30ppm',
    unidade: 'UN',
    grupo: 'Informática',
    estoque: 2,
    valor: 1290.00,
    estoque_status: 'low',
    preco: 1290.00,
    ncm: '8443.31.99',
    origem: '0',
    impostos: {
      icms: {
        cst: '00',
        aliquota: 18,
      },
      pis: {
        cst: '01',
        aliquota: 1.65
      },
      cofins: {
        cst: '01',
        aliquota: 7.6
      }
    },
    configEstado: {
      RS: {
        difal: false,
        aliquotaInterna: 17
      }
    }
  }
];

const Items = () => {
  const [isNewItemOpen, setIsNewItemOpen] = useState(false);
  const [isViewItemOpen, setIsViewItemOpen] = useState(false);
  const [isEditItemOpen, setIsEditItemOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Produto | null>(null);
  const [items, setItems] = useState<Produto[]>(mockItems);
  const { toast } = useToast();

  const handleAddNewItem = (item: any) => {
    const newItem: Produto = {
      id: Date.now().toString(),
      ...item,
      estoque: 0,
      estoque_status: 'none',
      valor: item.preco || 0
    };
    
    setItems([...items, newItem]);
    setIsNewItemOpen(false);
    
    toast({
      title: "Item adicionado",
      description: `${item.descricao} foi adicionado com sucesso.`,
    });
  };

  const handleUpdateItem = (item: any) => {
    if (!currentItem) return;
    
    const updatedItems = items.map(i => 
      i.id === currentItem.id ? { ...i, ...item, valor: item.preco || 0 } : i
    );
    
    setItems(updatedItems);
    setIsEditItemOpen(false);
    
    toast({
      title: "Item atualizado",
      description: `${item.descricao} foi atualizado com sucesso.`,
    });
  };

  const handleDeleteItem = () => {
    if (!currentItem) return;
    
    const filteredItems = items.filter(item => item.id !== currentItem.id);
    setItems(filteredItems);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Item excluído",
      description: `${currentItem.descricao} foi excluído com sucesso.`,
      variant: "destructive",
    });
  };

  const openViewItem = (item: Produto) => {
    setCurrentItem(item);
    setIsViewItemOpen(true);
  };

  const openEditItem = (item: Produto) => {
    setCurrentItem(item);
    setIsEditItemOpen(true);
  };

  const openDeleteDialog = (item: Produto) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader 
          title="Itens de Estoque" 
          description="Gerenciamento completo de produtos e serviços"
          actions={
            <Button onClick={() => setIsNewItemOpen(true)}>
              <Plus size={16} className="mr-2" />
              Novo Item
            </Button>
          }
        />
        
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">Catálogo</TabsTrigger>
            <TabsTrigger value="technical">Fichas Técnicas</TabsTrigger>
            <TabsTrigger value="tracking">Rastreamento</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center">
                  <Package size={18} className="mr-2" />
                  Catálogo de Itens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between items-center">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      className="pl-8 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="Buscar item..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Filter size={14} className="mr-1" />
                      Filtros
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText size={14} className="mr-1" />
                      Exportar
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[70px]"></TableHead>
                        <TableHead>Código</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Unidade</TableHead>
                        <TableHead>Grupo</TableHead>
                        <TableHead>NCM</TableHead>
                        <TableHead>Estoque</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="w-10 h-10 rounded bg-erp-gray-100 flex items-center justify-center">
                              <ImageIcon size={16} className="text-erp-gray-400" />
                            </div>
                          </TableCell>
                          <TableCell>{item.codigo}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{item.descricao}</p>
                              <p className="text-xs text-muted-foreground">{item.detalhes}</p>
                            </div>
                          </TableCell>
                          <TableCell>{item.unidade}</TableCell>
                          <TableCell>{item.grupo}</TableCell>
                          <TableCell>{item.ncm}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span 
                                className={`w-2 h-2 rounded-full mr-2 ${
                                  item.estoque_status === 'high' 
                                    ? 'bg-green-500' 
                                    : item.estoque_status === 'medium' 
                                      ? 'bg-amber-500' 
                                      : 'bg-red-500'
                                }`} 
                              />
                              <span>{item.estoque}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {item.valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => openViewItem(item)}
                              >
                                <Eye size={16} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => openEditItem(item)}
                              >
                                <Edit size={16} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => openDeleteDialog(item)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="technical" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center">
                  <Info size={18} className="mr-2" />
                  Fichas Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Conteúdo de fichas técnicas em construção...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tracking" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Rastreamento por Lote/Série</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Sistema de rastreamento em construção...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Item Side Panel */}
      <Sheet 
        open={isNewItemOpen} 
        onOpenChange={setIsNewItemOpen}
      >
        <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto">
          <div className="h-full">
            <ItemForm
              onClose={() => setIsNewItemOpen(false)}
              onSave={handleAddNewItem}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* View Item Dialog */}
      <Dialog 
        open={isViewItemOpen} 
        onOpenChange={setIsViewItemOpen}
      >
        <DialogContent className="w-full max-w-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Detalhes do Item</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsViewItemOpen(false)}>
              <X size={18} />
            </Button>
          </div>
          
          {currentItem && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Código</p>
                  <p className="font-medium">{currentItem.codigo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Grupo</p>
                  <p className="font-medium">{currentItem.grupo}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Descrição</p>
                <p className="font-medium">{currentItem.descricao}</p>
                <p className="text-sm text-muted-foreground mt-1">{currentItem.detalhes}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Unidade</p>
                  <p className="font-medium">{currentItem.unidade}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estoque Atual</p>
                  <p className="font-medium">{currentItem.estoque}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor</p>
                  <p className="font-medium">
                    {currentItem.valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">NCM</p>
                  <p className="font-medium">{currentItem.ncm}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CST ICMS</p>
                  <p className="font-medium">{currentItem.impostos.icms.cst}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Alíquota ICMS</p>
                  <p className="font-medium">{currentItem.impostos.icms.aliquota}%</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Item Side Panel */}
      <Sheet 
        open={isEditItemOpen} 
        onOpenChange={setIsEditItemOpen}
      >
        <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto">
          <div className="h-full">
            {currentItem && (
              <ItemForm
                onClose={() => setIsEditItemOpen(false)}
                onSave={handleUpdateItem}
                editingItem={currentItem}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o item "{currentItem?.descricao}"? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteItem} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default Items;
