import { Component, OnInit } from '@angular/core';
import { InvoicesService } from './invoices.service';
import { Invoice } from './invoice.interface';

@Component({
  selector: 'app-invoices',
  template: `
    <div class="space-y-6">
      <!-- Header Section -->
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Gestão Financeira</h2>
          <p class="text-gray-600 mt-1">Controle suas notas fiscais e recebimentos</p>
        </div>
        <div class="flex items-center space-x-3">
          <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Total: {{ invoices.length }} notas fiscais
          </span>
          <button class="btn btn-primary">
            + Nova Nota Fiscal
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        <span class="ml-3 text-gray-600">Carregando notas fiscais...</span>
      </div>

      <!-- Stats Cards -->
      <div *ngIf="!loading" class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="card p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-primary-100">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Emitidas</p>
              <p class="text-2xl font-semibold text-gray-900">{{ getStatusCount('emitida') }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-warning-100">
              <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Enviadas</p>
              <p class="text-2xl font-semibold text-gray-900">{{ getStatusCount('enviada') }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-success-100">
              <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Pagas</p>
              <p class="text-2xl font-semibold text-gray-900">{{ getStatusCount('paga') }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-success-100">
              <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Valor Total</p>
              <p class="text-2xl font-semibold text-gray-900">{{ getTotalPaidValue() | currency:'BRL':'symbol':'1.2-2':'pt' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Invoices List -->
      <div *ngIf="!loading" class="space-y-4">
        <div *ngFor="let invoice of invoices" class="card p-6 hover:shadow-lg transition-shadow duration-200">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-3">
                <h3 class="text-lg font-semibold text-gray-900">{{ invoice.number }}</h3>
                <span [class]="getStatusClass(invoice.status)" class="status-badge">
                  {{ getStatusLabel(invoice.status) }}
                </span>
              </div>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <p class="text-gray-500">Cliente</p>
                  <p class="font-medium text-gray-900">{{ invoice.clientName }}</p>
                </div>
                <div>
                  <p class="text-gray-500">Data Emissão</p>
                  <p class="font-medium text-gray-900">{{ formatDate(invoice.issueDate) }}</p>
                </div>
                <div>
                  <p class="text-gray-500">Vencimento</p>
                  <p class="font-medium text-gray-900">{{ formatDate(invoice.dueDate) }}</p>
                </div>
                <div>
                  <p class="text-gray-500">Valor</p>
                  <p class="font-medium text-gray-900">{{ invoice.amount | currency:'BRL':'symbol':'1.2-2':'pt' }}</p>
                </div>
              </div>
              
              <div class="mb-3">
                <p class="text-gray-500 text-sm">Descrição</p>
                <p class="text-gray-700 text-sm">{{ invoice.description }}</p>
              </div>
              
              <div *ngIf="invoice.notes" class="mb-3">
                <p class="text-gray-500 text-sm">Observações</p>
                <p class="text-gray-700 text-sm">{{ invoice.notes }}</p>
              </div>

              <div *ngIf="invoice.paymentDate" class="text-sm text-success-600">
                💚 Paga em {{ formatDate(invoice.paymentDate) }}
              </div>
            </div>
            
            <div class="flex flex-col space-y-2 ml-6">
              <button *ngIf="invoice.status === 'emitida'" 
                      class="btn btn-warning text-xs px-3 py-1"
                      (click)="sendInvoice(invoice.id)">
                📧 Enviar
              </button>
              <button *ngIf="invoice.status === 'enviada'" 
                      class="btn btn-success text-xs px-3 py-1"
                      (click)="markAsPaid(invoice.id)">
                ✅ Marcar Paga
              </button>
              <button *ngIf="invoice.status === 'vencida'" 
                      class="btn btn-danger text-xs px-3 py-1"
                      (click)="sendInvoice(invoice.id)">
                🔄 Reenviar
              </button>
              <button class="btn btn-primary text-xs px-3 py-1">
                📄 Visualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && invoices.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhuma nota fiscal encontrada</h3>
        <p class="mt-1 text-sm text-gray-500">Comece criando sua primeira nota fiscal</p>
        <div class="mt-6">
          <button class="btn btn-primary">+ Criar Nota Fiscal</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class InvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  loading = true;

  constructor(private invoicesService: InvoicesService) { }

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.loading = true;
    this.invoicesService.getInvoices().subscribe({
      next: (response) => {
        this.invoices = response.invoices;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar notas fiscais:', error);
        this.loading = false;
      }
    });
  }

  getStatusCount(status: Invoice['status']): number {
    return this.invoices.filter(invoice => invoice.status === status).length;
  }

  getTotalPaidValue(): number {
    return this.invoices
      .filter(invoice => invoice.status === 'paga')
      .reduce((total, invoice) => total + invoice.amount, 0);
  }

  getStatusClass(status: Invoice['status']): string {
    switch (status) {
      case 'emitida': return 'status-emitida';
      case 'enviada': return 'status-enviada';
      case 'paga': return 'status-paga';
      case 'vencida': return 'status-vencida';
      default: return '';
    }
  }

  getStatusLabel(status: Invoice['status']): string {
    switch (status) {
      case 'emitida': return 'Emitida';
      case 'enviada': return 'Enviada';
      case 'paga': return 'Paga';
      case 'vencida': return 'Vencida';
      default: return status;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  sendInvoice(id: string): void {
    const invoice = this.invoices.find(inv => inv.id === id);
    if (invoice) {
      invoice.status = 'enviada';
      // Em produção, chamar o serviço:
      // this.invoicesService.sendInvoice(id).subscribe();
    }
  }

  markAsPaid(id: string): void {
    const invoice = this.invoices.find(inv => inv.id === id);
    if (invoice) {
      invoice.status = 'paga';
      invoice.paymentDate = new Date().toISOString().split('T')[0];
      // Em produção, chamar o serviço:
      // this.invoicesService.updateInvoiceStatus(id, 'paga').subscribe();
    }
  }
}
