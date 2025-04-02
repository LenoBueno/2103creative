
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface NCMInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const NCMInput = ({ value, onChange, label = "NCM" }: NCMInputProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{ codigo: string; descricao: string }[]>([]);

  const handleSearch = async () => {
    if (!searchTerm || searchTerm.length < 3) return;
    
    setIsLoading(true);
    try {
      // Simulação de uma chamada à API de NCMs
      // Em um cenário real, substituir por uma chamada à API
      setTimeout(() => {
        setResults([
          { codigo: '8471.30.19', descricao: 'Máquinas automáticas para processamento de dados, portáteis' },
          { codigo: '8471.50.10', descricao: 'Unidades de processamento digitais de pequena capacidade' },
          { codigo: '8517.62.49', descricao: 'Aparelhos para comunicação em redes' }
        ].filter(item => 
          item.codigo.includes(searchTerm) || 
          item.descricao.toLowerCase().includes(searchTerm.toLowerCase())
        ));
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Erro ao buscar NCMs:", error);
      setIsLoading(false);
    }
  };

  const handleSelectNCM = (ncm: string) => {
    onChange(ncm);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="ncm">{label}</Label>
      <div className="flex gap-2">
        <Input
          id="ncm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="00.00.00.00"
          className="flex-1"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" type="button">
              <Search size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Buscar NCM</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Digite o código ou descrição"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button 
                  onClick={handleSearch} 
                  variant="secondary" 
                  disabled={isLoading}
                >
                  <Search size={16} />
                </Button>
              </div>
              <div className="max-h-52 overflow-y-auto">
                {isLoading ? (
                  <div className="text-center py-2">Carregando...</div>
                ) : results.length > 0 ? (
                  <ul className="space-y-1">
                    {results.map((item) => (
                      <li 
                        key={item.codigo}
                        className="p-2 hover:bg-muted rounded-md cursor-pointer"
                        onClick={() => handleSelectNCM(item.codigo)}
                      >
                        <div className="font-medium">{item.codigo}</div>
                        <div className="text-xs text-muted-foreground">{item.descricao}</div>
                      </li>
                    ))}
                  </ul>
                ) : searchTerm.length > 0 ? (
                  <div className="text-center py-2 text-muted-foreground">Nenhum resultado encontrado</div>
                ) : null}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default NCMInput;
