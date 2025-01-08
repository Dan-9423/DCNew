import { useState } from 'react';
import { Plus, FileText, Check, Eye, Pencil } from 'lucide-react';
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
  const { template, currentVersion, versions, updateTemplate, restoreVersion } = useEmailTemplate();
  const [showEditor, setShowEditor] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<{
    subject: string;
    content: string;
  } | null>(null);

  const handleSave = () => {
    if (selectedTemplate) {
      updateTemplate(selectedTemplate.content, 'Atualização do template');
      setShowEditor(false);
      toast({
        title: "Template salvo",
        description: "O template foi atualizado com sucesso.",
      });
    }
  };

  const handleSetActive = (version: typeof versions[0]) => {
    restoreVersion(version);
    toast({
      title: "Template ativado",
      description: `O template ${version.version} foi definido como atual.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Templates de E-mail</h1>
        <Button onClick={() => {
          setSelectedTemplate({ subject: '', content: '' });
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
        {versions.length > 0 ? (
          versions.map((version) => (
            <Card key={version.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{version.version}</h3>
                        {version.version === currentVersion && (
                          <Badge variant="secondary">Atual</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(version.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedTemplate({ subject: '', content: version.content });
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
                        setSelectedTemplate({ subject: '', content: version.content });
                        setShowEditor(true);
                      }}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    {version.version !== currentVersion && (
                      <Button
                        size="sm"
                        onClick={() => handleSetActive(version)}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Definir como Atual
                      </Button>
                    )}
                  </div>
                </div>
                <div className="font-mono text-sm bg-muted p-4 rounded-lg max-h-32 overflow-y-auto">
                  {version.content}
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
              {selectedTemplate?.content ? 'Editar Template' : 'Novo Template'}
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
              template={selectedTemplate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}