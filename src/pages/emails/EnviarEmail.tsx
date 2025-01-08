import { useState } from 'react';
import { useCustomers } from '@/contexts/CustomerContext';
import { useEmailTemplate } from '@/contexts/EmailTemplateContext';
import { EmailData } from '@/types/email';
import EmailForm from '@/components/forms/EmailForm';
import EmailPreview from '@/components/emails/EmailPreview';
import EmailHistoryList from '@/components/emails/EmailHistoryList';
import { getEmailTemplate } from '@/lib/email';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function EnviarEmail() {
  const { customers } = useCustomers();
  const { template } = useEmailTemplate();
  const [showPreview, setShowPreview] = useState(false);
  const [emailData, setEmailData] = useState<EmailData | null>(null);
  const [history] = useState([
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
    }
  ]);

  const handleEmailSubmit = (data: EmailData) => {
    setEmailData(data);
    setShowPreview(true);
  };

  const handleSendEmail = () => {
    // Here you would implement the actual email sending logic
    setShowPreview(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Enviar E-mail</h1>
      
      <div className="bg-white dark:bg-[#1C1C1C] rounded-lg p-6 shadow-lg space-y-6">
        <EmailForm 
          onSubmit={handleEmailSubmit}
          customers={customers}
        />
      </div>

      <div className="bg-white dark:bg-[#1C1C1C] rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Histórico de E-mails</h2>
        <EmailHistoryList
          history={history}
          onView={(email) => {
            setEmailData(email.emailData);
            setShowPreview(true);
          }}
        />
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Visualização do E-mail</DialogTitle>
          </DialogHeader>
          {emailData && (
            <EmailPreview
              data={emailData}
              template={getEmailTemplate(emailData, template)}
            />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Voltar
            </Button>
            <Button onClick={handleSendEmail}>
              Enviar E-mail
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}