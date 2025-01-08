import { EmailData } from '../types/email';
import { formatCurrency } from './utils';
import { useEmailTemplate } from '../contexts/EmailTemplateContext';

interface EmailTemplate {
  subject: string;
  content: string;
}

export function getEmailTemplate(data: EmailData): EmailTemplate {
  const { template } = useEmailTemplate();
  
  // Replace template variables
  const replacements = {
    '[[razaoSocial]]': data.razaoSocial,
    '[[numeroNF]]': data.numeroNF,
    '[[valorTotal]]': formatCurrency(data.valorTotal)
  };

  const subject = "Notificação de Crédito - DC Advisors";

  const content = template.replace(
    /\[\[(.*?)\]\]/g,
    (match) => replacements[match] || match
  );

  return { subject, content };
}