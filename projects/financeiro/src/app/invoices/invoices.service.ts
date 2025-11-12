import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice, InvoiceResponse } from './invoice.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private base = environment.api.baseUrl;
  private path = environment.api?.endpoints?.invoices ?? '/notasfiscais';

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<InvoiceResponse> {

    const url = `${this.base}${this.path}`;
    console.log('Using Invoices API URL:', `${url}`);
    return this.http.get<InvoiceResponse>(url);
  }

  getInvoiceById(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.base}${this.path}/${id}`);
  }

  updateInvoiceStatus(id: string, status: Invoice['status']): Observable<Invoice> {
    return this.http.patch<Invoice>(`${this.base}${this.path}/${id}`, { status });
  }

  sendInvoice(id: string): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.base}${this.path}/${id}/send`, {});
  }

  generateInvoice(invoice: Partial<Invoice>): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.base}${this.path}/emitir`, invoice);
  }
}
