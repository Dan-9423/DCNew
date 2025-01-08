import { useState } from 'react';
import { EmailData, EmailHistory } from '@/types/email';
import EmailHistoryList from '@/components/emails/EmailHistoryList';

// Mock data
const mockHistory: EmailHistory[] = [
  {
    id: '1',
    emailData: {
      razaoSocial: 'Empresa ABC Ltda',
      email: 'financeiro@abc.com',
      numeroNF: 'NF-123456',
      valorTotal: 1500.50,
    },
    status: 'sent',
    sentAt: '2024-03-20T10:30:00Z'
  },
  {
    id: '2',
    emailData: {
      razaoSocial: 'XYZ Indústria S.A.',
      email: 'cobranca@xyz.com',
      numeroNF: 'NF-789012',
      valorTotal: 2750.75,
    },
    status: 'draft',
    sentAt: '2024-03-19T15:45:00Z'
  }
];

export default function EnviarEmail() {
  const [history] = useState<EmailHistory[]>(mockHistory);

  const handleViewEmail = (email: EmailHistory) => {
    console.log('View email:', email);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Histórico de E-mails</h1>
      
      <div className="bg-white dark:bg-[#1C1C1C] rounded-lg p-6 shadow-lg space-y-6">
        <EmailHistoryList
          history={history}
          onView={handleViewEmail}
        />
      </div>
    </div>
  );
}