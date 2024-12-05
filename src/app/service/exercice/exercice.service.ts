import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Exercice } from 'src/app/model/Exercice';

@Injectable({
  providedIn: 'root',
})
export class ExerciceService {
  private apiUrl = environment.apiUrl + 'exercice'; // L'URL de votre API Spring Boot

  constructor(private http: HttpClient) {}

  getStructure(): Observable<Exercice[]> {
    return this.http.get<Exercice[]>(this.apiUrl + '/list/');
  }

  getStructureId(id: number): Observable<Exercice> {
    return this.http.get<Exercice>(`${this.apiUrl}/${id}`);
  }
}
