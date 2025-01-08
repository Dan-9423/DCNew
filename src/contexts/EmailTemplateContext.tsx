import React, { createContext, useContext, useState, useEffect } from 'react';
import { EmailTemplateState, EmailTemplateVersion } from '../types/emailTemplate';

const defaultTemplate = `Prezado(s) Senhor(es),

Esperamos que esteja bem.

Gostaríamos de informar que a DC ADVISORS LTDA, adquiriu da(e) A. PAES LTDA (MEGAFIX) o(s) crédito(s) referente(s) ao(s) boleto(s) bancário(s) em anexo, sacado(s) contra [[razaoSocial]].

Destacamos que a nota fiscal correspondente a esta operação está sendo enviada em anexo, contendo o número [[numeroNF]] e o valor total de [[valorTotal]].

A partir de agora, a gestão dos pagamentos referentes aos produtos adquiridos através da A. PAES LTDA será realizada pela DC ADVISORS.

Informamos que o pagamento poderá ser efetuado em agências ou correspondentes bancários. Caso não seja pago até o vencimento, nossos títulos estarão sujeitos à multas, juros e protestos, após 3 dias de atraso.

Fazemos questão de ressaltar que somente os pagamentos efetuados diretamente à DC ADVISORS, como detentora do crédito, serão considerados como quitação do débito.

Estamos à disposição para quaisquer esclarecimentos adicionais. No silêncio, consideraremos a operação como concluída em até 24 horas após o recebimento desta mensagem.

Agradecemos a sua atenção e confiança em nossos serviços.

Atenciosamente,`;

interface EmailTemplateContextType {
  template: string;
  currentVersion: string;
  versions: EmailTemplateVersion[];
  updateTemplate: (newTemplate: string, description: string) => void;
  restoreVersion: (version: EmailTemplateVersion) => void;
  deleteVersion: (versionId: string) => void;
}

const EmailTemplateContext = createContext<EmailTemplateContextType | undefined>(undefined);

export function EmailTemplateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<EmailTemplateState>(() => {
    const saved = localStorage.getItem('emailTemplateState');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      currentTemplate: defaultTemplate,
      currentVersion: 'Template V.001',
      versions: []
    };
  });

  useEffect(() => {
    localStorage.setItem('emailTemplateState', JSON.stringify(state));
  }, [state]);

  const getNextVersion = () => {
    if (!state.currentVersion) return 'Template V.001';
    
    const match = state.currentVersion.match(/V\.(\d+)/);
    if (!match) return 'Template V.001';
    
    const currentNumber = parseInt(match[1]);
    return `Template V.${String(currentNumber + 1).padStart(3, '0')}`;
  };

  const updateTemplate = (newTemplate: string, description: string) => {
    setState(prev => {
      const newVersion: EmailTemplateVersion = {
        id: crypto.randomUUID(),
        version: prev.currentVersion,
        content: prev.currentTemplate,
        createdAt: new Date(),
        description
      };

      return {
        currentTemplate: newTemplate,
        currentVersion: getNextVersion(),
        versions: [newVersion, ...prev.versions].slice(0, 5)
      };
    });
  };

  const restoreVersion = (version: EmailTemplateVersion) => {
    setState(prev => ({
      currentTemplate: version.content,
      currentVersion: version.version,
      versions: prev.versions
    }));
  };

  const deleteVersion = (versionId: string) => {
    setState(prev => ({
      ...prev,
      versions: prev.versions.filter(v => v.id !== versionId)
    }));
  };

  return (
    <EmailTemplateContext.Provider value={{
      template: state.currentTemplate,
      currentVersion: state.currentVersion,
      versions: state.versions,
      updateTemplate,
      restoreVersion,
      deleteVersion
    }}>
      {children}
    </EmailTemplateContext.Provider>
  );
}

export function useEmailTemplate() {
  const context = useContext(EmailTemplateContext);
  if (context === undefined) {
    throw new Error('useEmailTemplate must be used within a EmailTemplateProvider');
  }
  return context;
}