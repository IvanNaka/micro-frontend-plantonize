import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Atendimento, Plantao } from './appointment.interface';
import { AppointmentsService } from './appointment.service';

@Component({
  selector: 'app-agenda',
  standalone: true,
  // Include FormsModule so [(ngModel)] works in the create form
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements OnInit {
  // The UI expects a simplified appointment view; map Atendimento -> AppointmentView
  appointments: Array<{
    id: string;
    hospital: string;
    medico?: string;
    status: string;
    dataInicioFull: string;
    dataFinalFull: string;
    value: number;
    notes?: string;
  }> = [];
  loading = true;
  // Create form state
  showCreateForm = false;
  creating = false;
  createSuccess: string | null = null;
  createError: string | null = null;
  // Form fields for the plantão payload requested by user
  newAtendimento: {
    nomePaciente?: string;
    descricao?: string;
    dataInicio?: string;
    dataFinal?: string;
    horaInicio?: string;
    horaFinal?: string;
    tipoPlantao?: string;
    municipio?: string;
    valor?: number | null;
  } = {
    nomePaciente: '',
    descricao: '',
    dataInicio: '',
    dataFinal: '',
    horaInicio: '',
    horaFinal: '',
    tipoPlantao: 'Diurno',
    municipio: '',
    valor: null
  };

  // Fixed IDs as requested
  readonly FIXED_MEDICO_ID = '5A754E33-F590-45CD-A8E5-707648CD49CF';
  readonly FIXED_HOSPITAL_ID = '7101B733-9B66-4E4B-B3EF-F8E30714FE97';

  constructor(private appointmentsService: AppointmentsService) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  toggleCreate(): void {
    this.showCreateForm = !this.showCreateForm;
    this.createSuccess = null;
    this.createError = null;
  }

  loadAppointments(): void {
    this.loading = true;
    this.appointmentsService.getAtendimentos().subscribe({
      next: (response: Plantao[]) => {
        // Map Atendimento -> view model expected by the template
        this.appointments = response.map(a => ({
          id: a.id,
          hospital: a.hospital?.nome ?? '',
          medico: a.medico?.nome ?? '',
          status: (a.status ?? '').toString(),
          dataInicioFull: this.formatDateTime(a.dataInicio, a.horaInicio),
          dataFinalFull: this.formatDateTime(a.dataFinal, a.horaFinal),
          value: a.valor ?? 0,
          notes: a.atendimentos && a.atendimentos.length ? a.atendimentos[0].descricao ?? '' : ''
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar plantões:', error);
        this.loading = false;
      }
    });
  }

  getStatusCount(status: string): number {
    const s = (status ?? '').toString().toLowerCase();
    return this.appointments.filter(apt => (apt.status ?? '').toString().toLowerCase() === s).length;
  }

  getTotalValue(): number {
    // Sum the value of all plantoes (regardless of status)
    return this.appointments.reduce((total, apt) => total + (Number(apt.value) || 0), 0);
  }

  getStatusClass(status: string): string {
    const s = (status ?? '').toString().toLowerCase();
    switch (s) {
      case 'confirmado': return 'status-confirmado';
      case 'pendente': return 'status-pendente';
      case 'cancelado': return 'status-cancelado';
      default: return '';
    }
  }

  getStatusLabel(status: string): string {
    const s = (status ?? '').toString().toLowerCase();
    switch (s) {
      case 'confirmado': return 'Confirmado';
      case 'pendente': return 'Pendente';
      case 'cancelado': return 'Cancelado';
      default: return status ?? '';
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

  formatDateTime(dateString?: string, timeString?: string): string {
    if (!dateString && !timeString) return '';
    let dt: Date;
    if (dateString) {
      dt = new Date(dateString);
    } else {
      dt = new Date();
    }
    // If time provided and dateString doesn't already have time, set hours
    if (timeString && !/T/.test(dateString ?? '')) {
      const parts = (timeString || '').split(':').map(p => Number(p));
      if (parts.length >= 2) dt.setHours(parts[0] || 0, parts[1] || 0, parts[2] || 0);
    }
    return dt.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  updateStatus(id: string, status: string): void {
    const appointment = this.appointments.find(apt => apt.id === id);
    if (appointment) {
      // Optimistic UI update
      appointment.status = status;
      // Call backend to persist change. Service assumes PATCH { status } on /Atendimento/{id}
      this.appointmentsService.updateAtendimentoStatus(id, status).subscribe({
        next: () => {
          // success - nothing else to do (UI already updated)
        },
        error: (err) => {
          console.error('Erro ao atualizar status:', err);
          // revert optimistic update on error
          // For simplicity, reload the list
          this.loadAppointments();
        }
      });
    }
  }

  /** Create a new Atendimento using the BFF endpoint */
  createAtendimento(): void {
    this.createSuccess = null;
    this.createError = null;
    // Validation: require nomePaciente, descricao, dataInicio and horaInicio
    if (!this.newAtendimento.nomePaciente || this.newAtendimento.nomePaciente.trim().length === 0) {
      this.createError = 'Nome do paciente é obrigatório';
      return;
    }
    if ((this.newAtendimento.nomePaciente ?? '').length > 200) {
      this.createError = 'Nome do paciente deve ter no máximo 200 caracteres';
      return;
    }
    if (!this.newAtendimento.descricao || this.newAtendimento.descricao.trim().length === 0) {
      this.createError = 'Descrição é obrigatória';
      return;
    }
    if ((this.newAtendimento.descricao ?? '').length > 1000) {
      this.createError = 'Descrição deve ter no máximo 1000 caracteres';
      return;
    }
    if (!this.newAtendimento.dataInicio || !this.newAtendimento.horaInicio) {
      this.createError = 'Data início e hora início são obrigatórios';
      return;
    }
    this.creating = true;

    // Build payload exactly as requested (plantão payload)
    const payload = {
      medicoId: this.FIXED_MEDICO_ID,
      hospitalId: this.FIXED_HOSPITAL_ID,
      dataInicio: this.toIsoString(this.newAtendimento.dataInicio!),
      dataFinal: this.newAtendimento.dataFinal ? this.toIsoString(this.newAtendimento.dataFinal) : this.toIsoString(this.newAtendimento.dataInicio!),
      horaInicio: this.newAtendimento.horaInicio,
      horaFinal: this.newAtendimento.horaFinal,
      nomePaciente: this.newAtendimento.nomePaciente,
      descricao: this.newAtendimento.descricao,
      tipoPlantao: this.newAtendimento.tipoPlantao,
      municipio: this.newAtendimento.municipio,
      valor: this.newAtendimento.valor ?? 0
    };

    this.appointmentsService.createAtendimento(payload as any).subscribe({
      next: (created) => {
        this.createSuccess = 'Plantão cadastrado com sucesso';
        this.creating = false;
        this.showCreateForm = false;
        // reset form
        this.newAtendimento = { dataInicio: '', dataFinal: '', horaInicio: '', horaFinal: '', tipoPlantao: 'Diurno', municipio: '', valor: null };
        // reload list
        this.loadAppointments();
      },
      error: (err) => {
        console.error('Erro ao criar plantão:', err);
        this.createError = 'Erro ao criar plantão';
        this.creating = false;
      }
    });
  }

  private toIsoString(value?: string): string {
    if (!value) return new Date().toISOString();
    // If the string already looks like ISO, return it
    if (/\d{4}-\d{2}-\d{2}T/.test(value)) return value;
    // For datetime-local inputs (YYYY-MM-DDTHH:mm or similar), create Date and convert
    try {
      const d = new Date(value);
      return d.toISOString();
    } catch {
      return new Date().toISOString();
    }
  }
}
