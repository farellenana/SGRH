import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Employe } from '../model/employer';
import { AcademicBackground } from '../model/AcademicBackground';
import { ProfessionalBackground } from '../model/ProfessionalBackground';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl + 'rhemploye'; // L'URL de votre API Spring Boot

  constructor(private http: HttpClient) {}

  getEmployees(organisationId: string): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.apiUrl}/list/${organisationId}`);
  }

  getEmployeeById(
    employeeId: string,
    organisationId: string
  ): Observable<Employe[]> {
    const url = `${this.apiUrl}/getEmployeID/${organisationId}/${employeeId}`;
    console.log('Fetching employee details from URL:', url);
    return this.http.get<Employe[]>(url);
  }

  addEmployee(employee: Employe ): Observable<any> {
    return this.http.post(this.apiUrl + `/insert`, employee);
  }

  updateEmployee(employee: Employe): Observable<any> {
    return this.http.post<Employe>(`${this.apiUrl}`, employee);
  }

  deleteEmployee(employeeId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${employeeId}`);
  }


  getDocumentsByEmployeeId(employeeId: string): Observable<Document[]> {
    return this.http.get<Document[]>(this.apiUrl + `/rhemployedocument/list/documents?employeeId=${employeeId}`);
  }

  getAcademicBackgroundByEmployeeId(employeeId: string): Observable<AcademicBackground[]> {
    return this.http.get<AcademicBackground[]>(`/api/academic-background?employeeId=${employeeId}`);
  }

  getProfessionalBackgroundByEmployeeId(employeeId: string): Observable<ProfessionalBackground[]> {
    return this.http.get<ProfessionalBackground[]>(`/api/professional-background?employeeId=${employeeId}`);
  }


}
