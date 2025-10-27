import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atendimento, Plantao } from './appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  // Explicit Atendimento endpoint (user requested this exact URL)
  private atendimentoUrl = 'http://localhost:3000/api/plantoes';

  constructor(private http: HttpClient) { }

  /** GET list of Atendimentos (returns Plantao[] payload) */
  getAtendimentos(): Observable<Plantao[]> {
    return this.http.get<Plantao[]>(this.atendimentoUrl);
  }

  /** GET single Atendimento by id */
  getAtendimentoById(id: string): Observable<Atendimento> {
    return this.http.get<Atendimento>(`${this.atendimentoUrl}/${id}`);
  }

  /** Create new Atendimento (POST) - payload follows Plantao shape */
  createAtendimento(payload: Partial<Plantao>): Observable<Plantao> {
    return this.http.post<Plantao>(this.atendimentoUrl, payload);
  }

  /** Update Atendimento status via PATCH */
  updateAtendimentoStatus(id: string, status: string): Observable<Atendimento> {
    return this.http.patch<Atendimento>(`${this.atendimentoUrl}/${id}`, { status });
  }
}
