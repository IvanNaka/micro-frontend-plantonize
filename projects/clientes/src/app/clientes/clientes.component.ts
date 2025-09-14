import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Client {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email?: string;
  planType: 'particular' | 'convenio' | 'sus';
  status: 'ativo' | 'inativo';
  lastAppointment?: string;
  registrationDate: string;
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent implements OnInit {
  clients: Client[] = [];
  loading = true;

  constructor() { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.loading = true;
    // Simulando dados de clientes
    setTimeout(() => {
      this.clients = [
        {
          id: '1',
          name: 'Maria José Silva',
          cpf: '123.456.789-00',
          phone: '(11) 99999-8888',
          email: 'maria@email.com',
          planType: 'convenio',
          status: 'ativo',
          lastAppointment: '2024-08-15',
          registrationDate: '2024-01-10'
        },
        {
          id: '2',
          name: 'João Santos',
          cpf: '987.654.321-00',
          phone: '(11) 88888-7777',
          email: 'joao@email.com',
          planType: 'particular',
          status: 'ativo',
          lastAppointment: '2024-08-20',
          registrationDate: '2024-02-15'
        },
        {
          id: '3',
          name: 'Ana Lima',
          cpf: '456.789.123-00',
          phone: '(11) 77777-6666',
          email: 'ana@email.com',
          planType: 'sus',
          status: 'ativo',
          lastAppointment: '2024-09-10',
          registrationDate: '2024-09-01'
        }
      ];
      this.loading = false;
    }, 1000);
  }

  getClientsCount(): number {
    return this.clients.length;
  }

  getActiveClientsCount(): number {
    return this.clients.filter(client => client.status === 'ativo').length;
  }

  getTodayAppointments(): number {
    // Simulando consultas de hoje
    return 3;
  }

  getNewClientsThisMonth(): number {
    const currentMonth = new Date().getMonth();
    return this.clients.filter(client => {
      const registrationMonth = new Date(client.registrationDate).getMonth();
      return registrationMonth === currentMonth;
    }).length;
  }

  getPlanTypeClass(planType: string): string {
    switch (planType) {
      case 'convenio': return 'bg-green-100 text-green-800';
      case 'particular': return 'bg-blue-100 text-blue-800';
      case 'sus': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getPlanTypeLabel(planType: string): string {
    switch (planType) {
      case 'convenio': return 'Convênio';
      case 'particular': return 'Particular';
      case 'sus': return 'SUS';
      default: return planType;
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

  editClient(clientId: string): void {
    console.log('Editando cliente:', clientId);
    // Implementar lógica de edição
  }

  scheduleAppointment(clientId: string): void {
    console.log('Agendando consulta para cliente:', clientId);
    // Implementar lógica de agendamento
  }

  deleteClient(clientId: string): void {
    console.log('Excluindo cliente:', clientId);
    // Implementar lógica de exclusão
    this.clients = this.clients.filter(client => client.id !== clientId);
  }
}
