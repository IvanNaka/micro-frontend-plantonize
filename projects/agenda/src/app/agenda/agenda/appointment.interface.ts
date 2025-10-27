export interface Atendente {
  dataCriacao: string;
  ultimaAtualizacao: string;
  ativo: boolean;
  id: string;
  nome: string;
  email?: string;
  hospitalId?: string;
}

export interface Hospital {
  dataCriacao: string;
  ultimaAtualizacao: string;
  ativo: boolean;
  id: string;
  nome: string;
  municipio?: string;
  endereco?: string;
  atendentes?: Atendente[];
}

export interface Medico {
  dataCriacao: string;
  ultimaAtualizacao: string;
  ativo: boolean;
  id: string;
  nome: string;
  crm?: string;
  especialidade?: string;
  email?: string;
}

export interface Plantao {
  dataCriacao: string;
  ultimaAtualizacao: string;
  ativo: boolean;
  id: string;
  medicoId?: string;
  hospitalId?: string;
  dataInicio?: string; // ISO date
  dataFinal?: string; // ISO date
  horaInicio?: string; // e.g. '08:00'
  horaFinal?: string; // e.g. '12:00'
  tipoPlantao?: string;
  municipio?: string;
  valor?: number;
  status?: string;
  medico?: Medico;
  hospital?: Hospital;
  atendimentos?: Atendimento[];
}

export interface Atendimento {
  dataCriacao: string;
  ultimaAtualizacao: string;
  ativo: boolean;
  id: string;
  plantaoId?: string;
  nomePaciente?: string;
  descricao?: string;
  plantao?: Plantao;
}

// Note: frontend view-model derived from Atendimento can be mapped in the component.
