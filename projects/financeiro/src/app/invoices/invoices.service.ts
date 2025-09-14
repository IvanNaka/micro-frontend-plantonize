import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Invoice, InvoiceResponse } from './invoice.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private apiUrl = 'https://api.plantonize.test/invoices';

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<InvoiceResponse> {
    // Em produção, usar: return this.http.get<InvoiceResponse>(this.apiUrl);
    
    // Mock data para desenvolvimento
    const mockInvoices: Invoice[] = [
      {
        id: '1',
        number: 'NF-2025-001',
        issueDate: '2025-09-01',
        dueDate: '2025-09-15',
        clientName: 'Hospital São Lucas',
        description: 'Plantão Cardiologia - Setembro',
        amount: 2400.00,
        status: 'paga',
        paymentDate: '2025-09-14',
        notes: 'Pagamento realizado via PIX'
      },
      {
        id: '2',
        number: 'NF-2025-002',
        issueDate: '2025-09-08',
        dueDate: '2025-09-22',
        clientName: 'Clínica Coração',
        description: 'Plantão Cardiologia - Semana 2',
        amount: 1800.00,
        status: 'enviada',
        notes: 'Enviada por email em 08/09'
      },
      {
        id: '3',
        number: 'NF-2025-003',
        issueDate: '2025-09-10',
        dueDate: '2025-09-24',
        clientName: 'Hospital Central',
        description: 'Plantão Cardiologia - Final de semana',
        amount: 1500.00,
        status: 'emitida'
      },
      {
        id: '4',
        number: 'NF-2025-004',
        issueDate: '2025-08-15',
        dueDate: '2025-08-30',
        clientName: 'Clínica Cardio Plus',
        description: 'Plantão Cardiologia - Agosto',
        amount: 2200.00,
        status: 'vencida',
        notes: 'Vencida há 12 dias - entrar em contato'
      }
    ];

    const response: InvoiceResponse = {
      invoices: mockInvoices,
      total: mockInvoices.length,
      page: 1,
      totalPages: 1
    };

    return of(response).pipe(delay(800)); // Simula latência da API
  }

  getInvoiceById(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`);
  }

  updateInvoiceStatus(id: string, status: Invoice['status']): Observable<Invoice> {
    return this.http.patch<Invoice>(`${this.apiUrl}/${id}`, { status });
  }

  sendInvoice(id: string): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.apiUrl}/${id}/send`, {});
  }

  generateInvoice(invoice: Partial<Invoice>): Observable<Invoice> {
    return this.http.post<Invoice>(this.apiUrl, invoice);
  }
}
