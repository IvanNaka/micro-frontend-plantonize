export interface Appointment {
  id: string;
  date: string;
  time: string;
  hospital: string;
  specialty: string;
  doctor: string;
  value: number;
  status: 'confirmado' | 'pendente' | 'cancelado';
  notes?: string;
}

export interface AppointmentResponse {
  appointments: Appointment[];
  total: number;
  page: number;
  totalPages: number;
}
