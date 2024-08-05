import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private apiUrl = 'https://localhost:7294/api/Servicios';

  constructor(private http: HttpClient) {}

  getServicios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
