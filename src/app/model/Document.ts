export class Document {
  rhEmployeDocumentID: string = '';
  nom: string = '';
  date: string = '';
  description: string = '';
  type: string = '';
  file: File | null = null;
  url?: string;
}
