import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import TemplateEditor from '@/components/emails/TemplateEditor';
import EmailPreview from '@/components/emails/EmailPreview';

const mockEmailData = {
  razaoSocial: 'Empresa ABC Ltda',
  email: 'financeiro@abc.com',
  numeroNF: 'NF-123456',
  valorTotal: 1500.50,
};

export default function TemplateEmail() {
  const [showEditor, setShowEditor] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [template, setTemplate] = useState({
    subject: '',
    content: ''
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Templates de E-mail</h1>
        <Button onClick={() => setShowEditor(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Template
        </Button>
      </div>

      <div className="bg-white dark:bg-[#1C1C1C] rounded-lg p-6 shadow-lg">
        <p className="text-muted-foreground">Nenhum template criado ainda.</p>
      </div>

      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Novo Template de E-mail</DialogTitle>
          </DialogHeader>
          <TemplateEditor
            value={template}
            onChange={setTemplate}
            onPreview={() => setShowPreview(true)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Visualização do Template</DialogTitle>
          </DialogHeader>
          <EmailPreview
            data={mockEmailData}
            template={template}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}