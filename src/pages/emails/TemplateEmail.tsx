import { useState } from 'react';
import { Plus, FileText, Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEmailTemplate } from '@/contexts/EmailTemplateContext';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import TemplateEditor from '@/components/emails/TemplateEditor';
import EmailPreview from '@/components/emails/EmailPreview';

const mockEmailData = {
  razaoSocial: 'Empresa ABC Ltda',
  email: 'financeiro@abc.com',
  numeroNF: 'NF-123456',
  valorTotal: 1500.50,
};

const variablesList = [
  { name: '[[razaoSocial]]', description: 'Nome da empresa (Razão Social)' },
  { name: '[[numeroNF]]', description: 'Número da Nota Fiscal' },
  { name: '[[valorTotal]]', description: 'Valor total da operação (formatado em R$)' },
];

export default function TemplateEmail() {
  const { toast } = useToast();
  const { templates, addTemplate, deleteTemplate } = useEmailTemplate();
  const [showEditor, setShowEditor] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<{
    id?: string;
    version: string;
    subject: string;
    content: string;
  } | null>(null);

  const handleSave = () => {
    if (selectedTemplate) {
      if (selectedTemplate.id) {
        // Update existing template
        // updateTemplate(selectedTemplate.id, selectedTemplate);
      } else {
        // Add new template
        addTemplate(selectedTemplate);
      }
      setShowEditor(false);
      toast({
        title: "Template salvo",
        description: "O template foi salvo com sucesso.",
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteTemplate(id);
    setDeleteId(null);
    toast({
      title: "Template excluído",
      description: "O template foi excluído com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Templates de E-mail</h1>
        <Button onClick={() => {
          setSelectedTemplate({
            version: `Template ${templates.length + 1}`,
            subject: '',
            content: ''
          });
          setShowEditor(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Template
        </Button>
      </div>

      <Alert>
        <AlertTitle>Variáveis disponíveis</AlertTitle>
        <AlertDescription>
          <p className="mb-2">Use as seguintes variáveis no seu template:</p>
          <ul className="list-disc pl-4 space-y-1">
            {variablesList.map((variable) => (
              <li key={variable.name}>
                <code className="bg-muted px-1 py-0.5 rounded">{variable.name}</code>
                {' - '}{variable.description}
              </li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {templates.length > 0 ? (
          templates.map((template) => (
            <Card key={template.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{template.version}</h3>
                        <Badge variant="secondary">
                          {new Date(template.createdAt).toLocaleString()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {template.subject}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedTemplate(template);
                        setShowPreview(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedTemplate(template);
                        setShowEditor(true);
                      }}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setDeleteId(template.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Nenhum template criado ainda.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedTemplate?.id ? 'Editar Template' : 'Novo Template'}
            </DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <TemplateEditor
              value={selectedTemplate}
              onChange={setSelectedTemplate}
              onPreview={() => setShowPreview(true)}
            />
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowEditor(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Salvar Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Visualização do Template</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <EmailPreview
              data={mockEmailData}
              template={{
                subject: selectedTemplate.subject,
                content: selectedTemplate.content
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este template? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-red-500 hover:bg-red-600"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}