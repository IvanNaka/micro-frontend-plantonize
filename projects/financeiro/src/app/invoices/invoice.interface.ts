export interface InvoiceMedico {
  id: string;
  nome: string;
  cpfCnpj?: string;
  email?: string;
  municipio?: string;
  inscricaoMunicipal?: string;
  medicoId?: string;
}

export interface InvoiceTomador {
  nome: string;
  cpfCnpj?: string;
  email?: string;
  tipoTomador?: string;
  endereco?: string;
  municipio?: string;
}

export interface InvoiceServico {
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  aliquotaIss: number;
  valorTotal: number;
}

export interface Invoice {
  id: string;
  numeroNota: string;
  dataEmissao: string;
  valorTotal: number;
  status: number;
  paymentDate?: string;
  municipioPrestacao?: string;
  issRetido?: boolean;
  medico?: InvoiceMedico;
  tomador?: InvoiceTomador;
  servicos?: InvoiceServico[];
  enviadoEmail?: boolean;
  dataEnvioEmail?: string;
}

export type InvoiceResponse = Invoice[];
