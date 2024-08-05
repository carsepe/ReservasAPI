import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'https://localhost:7294/api/Reservas';

  constructor(private http: HttpClient) {}

  getReservas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createReserva(reserva: any): Observable<any> {
    return this.http.post(this.apiUrl, reserva);
  }
  
  updateReserva(id: number, reserva: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, reserva);
  }
  
}
