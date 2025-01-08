export interface EmailData {
  id?: string;
  razaoSocial: string;
  nomeFantasia?: string;
  email: string;
  numeroNF: string;
  valorTotal: number;
  dataVencimento?: string;
  observacoes?: string;
}

export interface EmailHistory {
  id: string;
  emailData: EmailData;
  status: 'draft' | 'saved' | 'sent';
  sentAt: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}