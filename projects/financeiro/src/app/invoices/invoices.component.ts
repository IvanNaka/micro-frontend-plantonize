import { Component, OnInit } from '@angular/core';
import { InvoicesService } from './invoices.service';
import { Invoice } from './invoice.interface';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

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
          <button class="btn btn-primary" (click)="openForm()">
            + Nova Nota Fiscal
          </button>
        </div>
      </div>

      <!-- Create Invoice Form -->
      <div *ngIf="showForm" class="card p-6 bg-white border">
        <form [formGroup]="invoiceForm" (ngSubmit)="createInvoice()" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-gray-600">Número da Nota</label>
              <input class="input" [ngClass]="{'input-invalid': getControl('numeroNota')?.invalid && (getControl('numeroNota')?.touched || getControl('numeroNota')?.dirty)}" formControlName="numeroNota" />
              <div *ngIf="getControl('numeroNota')?.invalid && (getControl('numeroNota')?.touched || getControl('numeroNota')?.dirty)" class="error-text">Número da nota é obrigatório.</div>
            </div>
            <div>
              <label class="block text-sm text-gray-600">Data de Emissão</label>
              <input class="input" [ngClass]="{'input-invalid': getControl('dataEmissao')?.invalid && (getControl('dataEmissao')?.touched || getControl('dataEmissao')?.dirty)}" type="datetime-local" formControlName="dataEmissao" />
              <div *ngIf="getControl('dataEmissao')?.invalid && (getControl('dataEmissao')?.touched || getControl('dataEmissao')?.dirty)" class="error-text">Data de emissão é obrigatória.</div>
            </div>
            <div>
              <label class="block text-sm text-gray-600">Valor Total</label>
              <input class="input" [ngClass]="{'input-invalid': getControl('valorTotal')?.invalid && (getControl('valorTotal')?.touched || getControl('valorTotal')?.dirty)}" type="number" formControlName="valorTotal" />
              <div *ngIf="getControl('valorTotal')?.invalid && (getControl('valorTotal')?.touched || getControl('valorTotal')?.dirty)" class="error-text">Valor total é obrigatório e deve ser >= 0.</div>
            </div>
            <div>
              <label class="block text-sm text-gray-600">Município de Prestação</label>
              <input class="input" [ngClass]="{'input-invalid': getControl('municipioPrestacao')?.invalid && (getControl('municipioPrestacao')?.touched || getControl('municipioPrestacao')?.dirty)}" formControlName="municipioPrestacao" />
              <div *ngIf="getControl('municipioPrestacao')?.invalid && (getControl('municipioPrestacao')?.touched || getControl('municipioPrestacao')?.dirty)" class="error-text">Município de prestação é obrigatório.</div>
            </div>
          </div>

            <div class="mt-2">
            <h4 class="font-medium">Tomador</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2" formGroupName="tomador">
              <div>
                <label class="block text-sm text-gray-600">Nome</label>
                <input class="input" [ngClass]="{'input-invalid': getControl('tomador.nome')?.invalid && (getControl('tomador.nome')?.touched || getControl('tomador.nome')?.dirty)}" formControlName="nome" />
                <div *ngIf="getControl('tomador.nome')?.invalid && (getControl('tomador.nome')?.touched || getControl('tomador.nome')?.dirty)" class="error-text">Nome do tomador é obrigatório.</div>
              </div>
              <div>
                <label class="block text-sm text-gray-600">CPF/CNPJ</label>
                <input class="input" [ngClass]="{'input-invalid': getControl('tomador.cpfCnpj')?.invalid && (getControl('tomador.cpfCnpj')?.touched || getControl('tomador.cpfCnpj')?.dirty)}" formControlName="cpfCnpj" />
                <div *ngIf="getControl('tomador.cpfCnpj')?.invalid && (getControl('tomador.cpfCnpj')?.touched || getControl('tomador.cpfCnpj')?.dirty)" class="error-text">CPF/CNPJ é obrigatório.</div>
              </div>
              <div>
                <label class="block text-sm text-gray-600">Email</label>
                <input class="input" [ngClass]="{'input-invalid': getControl('tomador.email')?.invalid && (getControl('tomador.email')?.touched || getControl('tomador.email')?.dirty)}" type="email" formControlName="email" />
                <div *ngIf="getControl('tomador.email')?.invalid && (getControl('tomador.email')?.touched || getControl('tomador.email')?.dirty)" class="error-text">Email inválido ou obrigatório.</div>
              </div>
              <div>
                <label class="block text-sm text-gray-600">Tipo Tomador</label>
                <input class="input" [ngClass]="{'input-invalid': getControl('tomador.tipoTomador')?.invalid && (getControl('tomador.tipoTomador')?.touched || getControl('tomador.tipoTomador')?.dirty)}" formControlName="tipoTomador" />
                <div *ngIf="getControl('tomador.tipoTomador')?.invalid && (getControl('tomador.tipoTomador')?.touched || getControl('tomador.tipoTomador')?.dirty)" class="error-text">Tipo do tomador é obrigatório.</div>
              </div>
              <div>
                <label class="block text-sm text-gray-600">Endereço</label>
                <input class="input" formControlName="endereco" />
              </div>
              <div>
                <label class="block text-sm text-gray-600">Município</label>
                <input class="input" formControlName="municipio" />
              </div>
            </div>
          </div>

          <!-- Servicos -->
          <div class="mt-4">
            <h4 class="font-medium">Serviços</h4>
            <div class="space-y-3 mt-2" formArrayName="servicos">
              <div *ngFor="let s of servicos.controls; let i = index" [formGroupName]="i" class="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                <div class="md:col-span-2">
                  <label class="block text-sm text-gray-600">Descrição</label>
                  <input class="input" [ngClass]="{'input-invalid': getServicoControl(i,'descricao')?.invalid && (getServicoControl(i,'descricao')?.touched || getServicoControl(i,'descricao')?.dirty)}" formControlName="descricao" />
                  <div *ngIf="getServicoControl(i,'descricao')?.invalid && (getServicoControl(i,'descricao')?.touched || getServicoControl(i,'descricao')?.dirty)" class="error-text">Descrição é obrigatória.</div>
                </div>
                <div>
                  <label class="block text-sm text-gray-600">Quantidade</label>
                  <input class="input" [ngClass]="{'input-invalid': getServicoControl(i,'quantidade')?.invalid && (getServicoControl(i,'quantidade')?.touched || getServicoControl(i,'quantidade')?.dirty)}" type="number" formControlName="quantidade" />
                  <div *ngIf="getServicoControl(i,'quantidade')?.invalid && (getServicoControl(i,'quantidade')?.touched || getServicoControl(i,'quantidade')?.dirty)" class="error-text">Quantidade inválida (>= 0).</div>
                </div>
                <div>
                  <label class="block text-sm text-gray-600">Valor Unitário</label>
                  <input class="input" [ngClass]="{'input-invalid': getServicoControl(i,'valorUnitario')?.invalid && (getServicoControl(i,'valorUnitario')?.touched || getServicoControl(i,'valorUnitario')?.dirty)}" type="number" step="0.01" formControlName="valorUnitario" />
                  <div *ngIf="getServicoControl(i,'valorUnitario')?.invalid && (getServicoControl(i,'valorUnitario')?.touched || getServicoControl(i,'valorUnitario')?.dirty)" class="error-text">Valor unitário inválido (>= 0).</div>
                </div>
                <div>
                  <label class="block text-sm text-gray-600">Alíquota ISS</label>
                  <input class="input" [ngClass]="{'input-invalid': getServicoControl(i,'aliquotaIss')?.invalid && (getServicoControl(i,'aliquotaIss')?.touched || getServicoControl(i,'aliquotaIss')?.dirty)}" type="number" step="0.01" formControlName="aliquotaIss" />
                  <div *ngIf="getServicoControl(i,'aliquotaIss')?.invalid && (getServicoControl(i,'aliquotaIss')?.touched || getServicoControl(i,'aliquotaIss')?.dirty)" class="error-text">Alíquota inválida (>= 0).</div>
                </div>
                <div class="flex space-x-2">
                  <button type="button" class="btn btn-danger" (click)="removeServico(i)">Remover</button>
                </div>
              </div>

              <div>
                <button type="button" class="btn btn-secondary" (click)="addServico()">+ Adicionar Serviço</button>
              </div>
            </div>
          </div>

          <div class="flex space-x-3 mt-4">
            <button type="submit" class="btn btn-primary" [disabled]="invoiceForm.invalid">Criar</button>
            <button type="button" class="btn btn-secondary" (click)="closeForm()">Cancelar</button>
          </div>
          
          <!-- Debug: show form validity and basic errors -->
          <div class="mt-2 text-sm text-gray-600">
            <div>Form valid: {{ invoiceForm.valid }}</div>
            <div>Form status: {{ invoiceForm.status }}</div>
            <div *ngIf="invoiceForm?.invalid">
              <p class="text-red-600">Campos inválidos:</p>
              <ul>
                <li *ngIf="invoiceForm.get('numeroNota')?.invalid">Número da nota inválido</li>
                <li *ngIf="invoiceForm.get('dataEmissao')?.invalid">Data de emissão inválida</li>
                <li *ngIf="invoiceForm.get('valorTotal')?.invalid">Valor total inválido</li>
                <li *ngIf="invoiceForm.get('municipioPrestacao')?.invalid">Município de prestação inválido</li>
                <li *ngIf="invoiceForm.get('tomador.nome')?.invalid">Tomador.nome inválido</li>
                <li *ngIf="invoiceForm.get('tomador.cpfCnpj')?.invalid">Tomador.cpfCnpj inválido</li>
                <li *ngIf="invoiceForm.get('tomador.email')?.invalid">Tomador.email inválido</li>
                <li *ngIf="invoiceForm.get('tomador.tipoTomador')?.invalid">Tomador.tipoTomador inválido</li>
              </ul>
            </div>
          </div>
        </form>
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
                <h3 class="text-lg font-semibold text-gray-900">{{ invoice.numeroNota }}</h3>
                <span [class]="getStatusClass(invoice.status)" class="status-badge">
                  {{ getStatusLabel(invoice.status) }}
                </span>
              </div>
              
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p class="text-gray-500">Valor Total</p>
                      <p class="font-medium text-gray-900">{{ invoice.valorTotal | currency:'BRL':'symbol':'1.2-2':'pt' }}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Médico</p>
                      <p class="font-medium text-gray-900">{{ invoice.medico?.nome }}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Tomador</p>
                      <p class="font-medium text-gray-900">{{ invoice.tomador?.nome }}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Email Enviado</p>
                      <p class="font-medium text-gray-900">{{ invoice.enviadoEmail ? 'Sim' : 'Não' }}</p>
                    </div>
                  </div>
              
              <div class="mb-3">
                <p class="text-gray-500 text-sm">Emissão</p>
                <p class="text-gray-700 text-sm">{{ formatDate(invoice.dataEmissao) }}</p>
              </div>

              <div *ngIf="invoice.paymentDate" class="text-sm text-success-600">
                💚 Paga em {{ formatDate(invoice.paymentDate) }}
              </div>
            </div>
            
              <div class="flex flex-col space-y-2 ml-6">
              <button *ngIf="invoice.status === 1" 
                      class="btn btn-warning text-xs px-3 py-1"
                      (click)="sendInvoice(invoice.id)">
                📧 Enviar
              </button>
              <button *ngIf="invoice.status === 2" 
                      class="btn btn-success text-xs px-3 py-1"
                      (click)="markAsPaid(invoice.id)">
                ✅ Marcar Paga
              </button>
              <button *ngIf="invoice.status === 4" 
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
  styles: [
    `
    .input { width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 0.375rem; }
    .input-invalid { border-color: #ef4444 !important; box-shadow: 0 0 0 3px rgba(239,68,68,0.06); }
    .error-text { color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem; }
    .card { background: #fff; border-radius: 0.5rem; }
    form { max-width: 100%; }
    .status-badge { padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; }
    `
  ]
})
export class InvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  loading = true;

  showForm = false;
  invoiceForm!: FormGroup;
  readonly MEDICO_ID = '5A754E33-F590-45CD-A8E5-707648CD49CF';

  constructor(private invoicesService: InvoicesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadInvoices();
    this.initForm();
  }

  initForm(): void {
    this.invoiceForm = this.fb.group({
      numeroNota: ['', Validators.required],
      dataEmissao: ['', Validators.required],
      valorTotal: [0, [Validators.required, Validators.min(0)]],
      municipioPrestacao: ['', Validators.required],
      tomador: this.fb.group({
        nome: ['', Validators.required],
        cpfCnpj: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        tipoTomador: ['', Validators.required],
        endereco: [''],
        municipio: ['']
      })
      ,
      servicos: this.fb.array([
        this.createServicoGroup()
      ])
    });
  }

  createServicoGroup(): FormGroup {
    return this.fb.group({
      descricao: ['', Validators.required],
      quantidade: [0, [Validators.required, Validators.min(0)]],
      valorUnitario: [0, [Validators.required, Validators.min(0)]],
      aliquotaIss: [0, [Validators.required, Validators.min(0)]]
    });
  }

  get servicos(): FormArray {
    return this.invoiceForm.get('servicos') as FormArray;
  }

  addServico(): void {
    this.servicos.push(this.createServicoGroup());
  }

  removeServico(index: number): void {
    if (this.servicos.length > 1) this.servicos.removeAt(index);
  }

  getControl(name: string) {
    return this.invoiceForm.get(name);
  }

  getServicoControl(index: number, name: string) {
    const grp = this.servicos.at(index) as FormGroup;
    return grp ? grp.get(name) : null;
  }

  loadInvoices(): void {
    this.loading = true;
    this.invoicesService.getInvoices().subscribe({
      next: (response) => {
        console.log('Notas fiscais carregadas:', response);
        // backend returns an array of invoices
        this.invoices = Array.isArray(response) ? response : (response as any).invoices ?? [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar notas fiscais:', error);
        this.loading = false;
      }
    });
  }

  openForm(): void {
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.initForm();
  }

  createInvoice(): void {
    if (!this.invoiceForm || this.invoiceForm.invalid) {
      this.invoiceForm.markAllAsTouched();
      return;
    }

    const raw = this.invoiceForm.value;
    let dataEmissaoIso = raw.dataEmissao;
    try {
      const d = new Date(raw.dataEmissao);
      if (!isNaN(d.getTime())) dataEmissaoIso = d.toISOString();
    } catch (e) {
      // keep raw
    }

    const payload: any = {
      numeroNota: raw.numeroNota,
      dataEmissao: dataEmissaoIso,
      valorTotal: Number(raw.valorTotal) || 0,
      municipioPrestacao: raw.municipioPrestacao,
      medicoId: this.MEDICO_ID,
      tomador: {
        nome: raw.tomador.nome,
        cpfCnpj: raw.tomador.cpfCnpj,
        email: raw.tomador.email,
        tipoTomador: raw.tomador.tipoTomador,
        endereco: raw.tomador.endereco,
        municipio: raw.tomador.municipio
      }
    };
    // include servicos
    if (raw.servicos && Array.isArray(raw.servicos)) {
      payload.servicos = raw.servicos.map((s: any) => ({
        descricao: s.descricao,
        quantidade: Number(s.quantidade) || 0,
        valorUnitario: Number(s.valorUnitario) || 0,
        aliquotaIss: Number(s.aliquotaIss) || 0
      }));
    } else {
      payload.servicos = [];
    }

    this.invoicesService.generateInvoice(payload).subscribe({
      next: (created) => {
        this.invoices.unshift(created as Invoice);
        this.closeForm();
      },
      error: (err) => {
        console.error('Erro ao criar nota fiscal:', err);
      }
    });
  }

  private mapStatusNameToCode(name: string | number): number | undefined {
    if (typeof name === 'number') return name;
    const lower = (name || '').toString().toLowerCase();
    if (lower === 'emitida') return 1;
    if (lower === 'enviada') return 2;
    if (lower === 'paga') return 3;
    if (lower === 'vencida') return 4;
    return undefined;
  }

  getStatusCount(status: Invoice['status'] | number | string): number {
    const code = this.mapStatusNameToCode(status as any);
    if (typeof code === 'number') {
      return this.invoices.filter(invoice => invoice.status === code).length;
    }
    // fallback: strict equality (handles unexpected values)
    return this.invoices.filter(invoice => invoice.status === status as any).length;
  }

  getTotalPaidValue(): number {
    // Sum valorTotal for invoices marked as paid (assuming status code 3 means 'paga')
    return this.invoices
      .filter(invoice => invoice.status === 3)
      .reduce((total, invoice) => total + (invoice.valorTotal ?? 0), 0);
  }

  getStatusClass(status: Invoice['status'] | number | string): string {
    // Map numeric status codes to classes
    if (status === 1 || status === 'emitida') return 'status-emitida';
    if (status === 2 || status === 'enviada') return 'status-enviada';
    if (status === 3 || status === 'paga') return 'status-paga';
    if (status === 4 || status === 'vencida') return 'status-vencida';
    return '';
  }

  getStatusLabel(status: Invoice['status'] | number | string): string {
    if (status === 1 || status === 'emitida') return 'Emitida';
    if (status === 2 || status === 'enviada') return 'Enviada';
    if (status === 3 || status === 'paga') return 'Paga';
    if (status === 4 || status === 'vencida') return 'Vencida';
    return String(status);
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';

    // Detect whether the input includes time information (ISO datetime or contains ':')
    const hasTime = dateString.includes('T') || /:\d{2}/.test(dateString);

    // Try to parse the value. For plain dates like 'YYYY-MM-DD' some engines treat them
    // as UTC and can shift the day when converted to local time; we attempt a safe
    // parse and fallback to appending 'T00:00:00' if needed.
    let date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // fallback: try treating as local date-only
      date = new Date(dateString + 'T00:00:00');
    }

    if (isNaN(date.getTime())) {
      // if parsing still fails, return the raw string as a last resort
      return dateString;
    }

    if (hasTime) {
      // Show date + time in pt-BR (24h)
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    }

    // Date-only presentation
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  sendInvoice(id: string): void {
    const invoice = this.invoices.find(inv => inv.id === id);
    if (invoice) {
      // optimistic update: mark as 'enviada' (status code 2)
      invoice.status = 2 as any;
      // Em produção, chamar o serviço:
      // this.invoicesService.sendInvoice(id).subscribe();
    }
  }

  markAsPaid(id: string): void {
    const invoice = this.invoices.find(inv => inv.id === id);
    if (invoice) {
      invoice.status = 3 as any;
      invoice.paymentDate = new Date().toISOString().split('T')[0];
      // Em produção, chamar o serviço:
      // this.invoicesService.updateInvoiceStatus(id, 'paga').subscribe();
    }
  }
}
