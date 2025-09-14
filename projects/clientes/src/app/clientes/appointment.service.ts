import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Appointment, AppointmentResponse } from './appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private apiUrl = 'https://api.plantonize.test/appointments';

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<AppointmentResponse> {
    // Em produção, usar: return this.http.get<AppointmentResponse>(this.apiUrl);
    
    // Mock data para desenvolvimento
    const mockAppointments: Appointment[] = [
      {
        id: '1',
        date: '2025-09-15',
        time: '08:00',
        hospital: 'Hospital São Lucas',
        specialty: 'Cardiologia',
        doctor: 'Dr. Silva',
        value: 800.00,
        status: 'confirmado',
        notes: 'Plantão de emergência'
      },
      {
        id: '2',
        date: '2025-09-16',
        time: '20:00',
        hospital: 'Clínica Coração',
        specialty: 'Cardiologia',
        doctor: 'Dr. Silva',
        value: 600.00,
        status: 'pendente',
        notes: 'Plantão noturno'
      },
      {
        id: '3',
        date: '2025-09-18',
        time: '14:00',
        hospital: 'Hospital Central',
        specialty: 'Cardiologia',
        doctor: 'Dr. Silva',
        value: 750.00,
        status: 'confirmado'
      },
      {
        id: '4',
        date: '2025-09-20',
        time: '09:00',
        hospital: 'Hospital São Lucas',
        specialty: 'Cardiologia',
        doctor: 'Dr. Silva',
        value: 800.00,
        status: 'cancelado',
        notes: 'Cancelado pelo hospital'
      }
    ];

    const response: AppointmentResponse = {
      appointments: mockAppointments,
      total: mockAppointments.length,
      page: 1,
      totalPages: 1
    };

    return of(response).pipe(delay(1000)); // Simula latência da API
  }

  getAppointmentById(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  updateAppointmentStatus(id: string, status: Appointment['status']): Observable<Appointment> {
    return this.http.patch<Appointment>(`${this.apiUrl}/${id}`, { status });
  }
}
