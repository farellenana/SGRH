import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Organisation } from 'src/app/model/Organisation';
import { Structure } from 'src/app/model/Structure';

@Injectable({
  providedIn: 'root',
})
export class OrganisationService {
  private apiUrl = environment.apiUrl; // L'URL de votre API Spring Boot

  constructor(private http: HttpClient) {}

  getOrganisation(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(
      this.apiUrl + 'organisation/list/true/'
    );
  }

  getOrganisationbyId(id: number): Observable<Organisation> {
    return this.http.get<Organisation>(`${this.apiUrl}/${id}`);
  }

  // getStructuresByOrganisation(organisationId: string): Observable<Structure[]> {
  //   return this.http.get<Structure[]>(
  //     `/api/structures?organisationId=${organisationId}`
  //   );
  // }

  getStructuresByOrganisation(organisationId: string): Observable<Structure[]> {
    return this.http.get<Structure[]>(
      this.apiUrl + `structure/list/${organisationId}`
    );
  }
}
