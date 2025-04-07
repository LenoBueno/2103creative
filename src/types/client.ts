
export interface Client {
  id?: number;
  name?: string;
  surname?: string;
  cpf?: string;
  rg?: string;
  issuer?: string;
  uf?: string;
  gender?: string;
  birthday?: string;
  companyName?: string;
  tradeName?: string;
  cnpj?: string;
  ieIndicator?: string;
  stateRegistration?: string;
  municipalRegistration?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  website?: string;
  observation?: string;
  creditLimit: number;
  isActive: boolean;
  type: 'physical' | 'legal';
  issWithheld: boolean;
  isFinalConsumer: boolean;
  isRuralProducer: boolean;
  nfeEmail?: string;
  addresses: any[];
  contacts: any[];
  bankAccounts: any[];
  documents: any[];
  credits: any[];
  history: any[];
}

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Feminino' },
  { value: 'other', label: 'Outro' }
];

export const UF_OPTIONS = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
];

export const IE_INDICATOR_OPTIONS = [
  { value: '1', label: '1 - Contribuinte ICMS' },
  { value: '2', label: '2 - Contribuinte isento de Inscrição' },
  { value: '9', label: '9 - Não Contribuinte' }
];

export const DOCUMENT_TYPE_OPTIONS = [
  { value: 'cenae', label: 'CENAE' },
  { value: 'ie', label: 'Inscrição Estadual' },
  { value: 'iest', label: 'Inscrição Estadual ST' },
  { value: 'im', label: 'Inscrição Municipal' },
  { value: 'suframa', label: 'SUFRAMA' }
];

export const BANK_OPTIONS = [
  { value: '001', label: '001 - Banco do Brasil' },
  { value: '033', label: '033 - Santander' },
  { value: '104', label: '104 - Caixa Econômica Federal' },
  { value: '237', label: '237 - Bradesco' },
  { value: '341', label: '341 - Itaú' },
  { value: '756', label: '756 - Sicoob' }
];
