import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Structure } from 'src/app/model/Structure';

@Injectable({
  providedIn: 'root',
})
export class StructureService {
  constructor(private http: HttpClient) {}

  
}
