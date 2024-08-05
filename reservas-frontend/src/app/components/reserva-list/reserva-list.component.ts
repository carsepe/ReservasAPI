import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reserva-list',
  templateUrl: './reserva-list.component.html',
  styleUrls: ['./reserva-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ReservaListComponent implements OnInit {
  reservas: any[] = [];

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.reservaService.getReservas().subscribe(data => {
      this.reservas = data.map((reserva: any) => ({
        ...reserva,
        clienteNombre: reserva.cliente.nombre,
        servicioNombre: reserva.servicio.nombre
      }));
    });
  }
}
