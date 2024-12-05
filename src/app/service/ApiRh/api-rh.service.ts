import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiRhService {
  private urlserveur = environment.apiUrl;

  constructor(private http: HttpClient) {}
  fichierequis: any[] = [];

  getAcademicBackground(id: string): Observable<any> {
    return this.http.get(this.urlserveur+ 'rhemploye/rhacademicbackground/list/'+ id);
  }

  getProfessionalBackground(id: string): Observable<any> {
    return this.http.get(this.urlserveur+ 'rhemploye/rhprofessionnalbackground/list/'+ id);
  }

  saveFile(
    file: File,
    login: string,
    type: string
  ): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('id', login);
    formData.append('type', type);
    const req = new HttpRequest(
      'POST',
      `${this.urlFichierSaveFile}`,
      formData,
      { reportProgress: true, responseType: 'json' }
    );
    return this.http.request(req);
  }

  fichierDownload(encodedFilename: string) {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get(`${this.urlFichierDownload}/${encodedFilename}`, {
      headers,
      responseType: 'blob',
    });
  }

  public listFichier(id: string, type: string): Observable<any> {
    return this.http.get(this.urlFichierList + '/' + id + '/' + type);
  }

  public listAllFichier(id: string): Observable<any> {
    return this.http.get(this.urlFichierList + '/' + id);
  }

  public deleteFichier(id: string): Observable<any> {
    return this.http.delete(this.urlFichierDelete + '/' + id);
  }

  urlFichierSaveFile = this.urlserveur + 'rhfile/file/rhSaveFile';
  urlFichierDownload = this.urlserveur + 'rhfile/file/download';
  // urlFichierList = this.urlserveur + 'rhfile/file/list';
  urlFichierListAll = this.urlserveur + 'rhfile/file/listAll';
  urlFichierDelete = this.urlserveur + 'rhfile/file/delete';
  urlFichierList = this.urlserveur + 'rhemploye/rhemployedocumentList/list';
}
