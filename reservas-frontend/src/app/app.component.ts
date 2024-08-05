import { Component, OnInit } from '@angular/core';
import { ClienteService } from './services/cliente.service';
import { ReservaService } from './services/reserva.service';
import { ServicioService } from './services/servicio.service';
import { ReservaCreateComponent } from './components/reserva-create/reserva-create.component';
import { ReservaEditComponent } from './components/reserva-edit/reserva-edit.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, ReservaCreateComponent, ReservaEditComponent]
})
export class AppComponent implements OnInit {
  reservas: any[] = [];
  clientes: any[] = [];
  servicios: any[] = [];
  selectedReserva: any = null;

  constructor(
    private reservaService: ReservaService,
    private clienteService: ClienteService,
    private servicioService: ServicioService
  ) {}

  ngOnInit(): void {
    this.getReservas();
    this.getClientes();
    this.getServicios();
  }

  getReservas(): void {
    this.reservaService.getReservas().subscribe((response) => {
      this.reservas = response
        .map((reserva: any) => ({
          ...reserva,
          clienteNombre: reserva.cliente.nombre,
          servicioNombre: reserva.servicio.nombre
        }))
        .sort((a: any, b: any) => b.id - a.id); // Ordenar por ID de mayor a menor
    });
  }
  getClientes(): void {
    this.clienteService.getClientes().subscribe((response) => {
      this.clientes = response;
    });
  }

  getServicios(): void {
    this.servicioService.getServicios().subscribe((response) => {
      this.servicios = response;
    });
  }

  onReservaCreada(): void {
    this.getReservas();
    this.selectedReserva = null;
  }

  editReserva(reserva: any): void {
    this.selectedReserva = reserva;
  }
}
