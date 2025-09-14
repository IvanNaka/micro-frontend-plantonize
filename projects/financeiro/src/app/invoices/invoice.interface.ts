export interface Invoice {
  id: string;
  number: string;
  issueDate: string;
  dueDate: string;
  clientName: string;
  description: string;
  amount: number;
  status: 'emitida' | 'enviada' | 'paga' | 'vencida';
  paymentDate?: string;
  notes?: string;
}

export interface InvoiceResponse {
  invoices: Invoice[];
  total: number;
  page: number;
  totalPages: number;
}
