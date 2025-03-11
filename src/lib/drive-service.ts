import axios from 'axios';

export interface FileMetadata {
  id: string;
  name: string;
  mimeType: string;
  webContentLink?: string;
  webViewLink?: string;
  thumbnailLink?: string;
}

export class GoogleDriveService {
  private apiKey: string;
  
  constructor() {
    const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
    
    if (!apiKey) {
      throw new Error('Google Drive API Key não configurada');
    }
    
    this.apiKey = apiKey;
  }
  
  async getFile(fileId: string): Promise<FileMetadata> {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/drive/v3/files/${fileId}`,
        {
          params: {
            key: this.apiKey,
            fields: 'id,name,mimeType,webContentLink,webViewLink,thumbnailLink',
          },
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Erro ao obter arquivo do Google Drive:', error);
      throw new Error('Falha ao obter arquivo do Google Drive');
    }
  }
  
  async listFiles(folderId: string): Promise<FileMetadata[]> {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/drive/v3/files',
        {
          params: {
            key: this.apiKey,
            q: `'${folderId}' in parents and trashed=false`,
            fields: 'files(id,name,mimeType,webContentLink,webViewLink,thumbnailLink)',
          },
        }
      );
      
      return response.data.files;
    } catch (error) {
      console.error('Erro ao listar arquivos do Google Drive:', error);
      throw new Error('Falha ao listar arquivos do Google Drive');
    }
  }
  
  getContentUrl(fileId: string): string {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  
  getThumbnailUrl(fileId: string): string {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w300`;
  }
  
  getEmbedUrl(fileId: string): string {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
}

export default new GoogleDriveService();