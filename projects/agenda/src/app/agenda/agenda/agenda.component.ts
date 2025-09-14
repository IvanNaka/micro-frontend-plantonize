import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Appointment } from './appointment.interface';
import { AppointmentsService } from './appointment.service';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements OnInit {
appointments: Appointment[] = [];
  loading = true;

  constructor(private appointmentsService: AppointmentsService) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.appointmentsService.getAppointments().subscribe({
      next: (response) => {
        this.appointments = response.appointments;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar plantões:', error);
        this.loading = false;
      }
    });
  }

  getStatusCount(status: Appointment['status']): number {
    return this.appointments.filter(apt => apt.status === status).length;
  }

  getTotalValue(): number {
    return this.appointments
      .filter(apt => apt.status === 'confirmado')
      .reduce((total, apt) => total + apt.value, 0);
  }

  getStatusClass(status: Appointment['status']): string {
    switch (status) {
      case 'confirmado': return 'status-confirmado';
      case 'pendente': return 'status-pendente';
      case 'cancelado': return 'status-cancelado';
      default: return '';
    }
  }

  getStatusLabel(status: Appointment['status']): string {
    switch (status) {
      case 'confirmado': return 'Confirmado';
      case 'pendente': return 'Pendente';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit'
    });
  }

  updateStatus(id: string, status: Appointment['status']): void {
    const appointment = this.appointments.find(apt => apt.id === id);
    if (appointment) {
      appointment.status = status;
      // Em produção, chamar o serviço:
      // this.appointmentsService.updateAppointmentStatus(id, status).subscribe();
    }
  }
}
