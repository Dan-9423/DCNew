export interface EmailTemplateVersion {
  id: string;
  version: string;
  content: string;
  createdAt: Date;
  description: string;
}

export interface EmailTemplateState {
  currentTemplate: string;
  currentVersion: string;
  versions: EmailTemplateVersion[];
}