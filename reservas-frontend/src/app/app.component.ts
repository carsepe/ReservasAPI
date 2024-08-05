import { Component, OnInit } from '@angular/core';
import { ClienteService } from './services/cliente.service';
import { ReservaService } from './services/reserva.service';
import { ServicioService } from './services/servicio.service';
import { ReservaCreateComponent } from './components/reserva-create/reserva-create.component';
import { ClienteCreateComponent } from './components/cliente-create/cliente-create.component';
import { ServicioCreateComponent } from './components/servicio-create/servicio-create.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para usar ngModel

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReservaCreateComponent,
    ClienteCreateComponent,
    ServicioCreateComponent
  ]
})
export class AppComponent implements OnInit {
  reservas: any[] = [];
  clientes: any[] = [];
  servicios: any[] = [];
  selectedReserva: any = null;
  showClienteForm: boolean = false;
  showServicioForm: boolean = false;

  // Propiedades para los filtros
  filterCliente: string = '';
  filterServicio: string = '';
  filterFecha: string = '';

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
        .sort((a: any, b: any) => b.id - a.id);
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

  onClienteCreado(): void {
    this.getClientes();
  }

  onServicioCreado(): void {
    this.getServicios();
  }

  deleteReserva(id: number): void {
    this.reservaService.deleteReserva(id).subscribe(() => {
      this.getReservas();
    }, error => {
      console.error('Error al eliminar la reserva: ', error);
    });
  }

  toggleClienteForm(): void {
    this.showClienteForm = !this.showClienteForm;
  }

  toggleServicioForm(): void {
    this.showServicioForm = !this.showServicioForm;
  }

  filteredReservas(): any[] {
    return this.reservas.filter(reserva => {
      const matchesCliente = !this.filterCliente || reserva.clienteId === +this.filterCliente;
      const matchesServicio = !this.filterServicio || reserva.servicioId === +this.filterServicio;
      const matchesFecha = !this.filterFecha || reserva.fecha.startsWith(this.filterFecha);
      return matchesCliente && matchesServicio && matchesFecha;
    });
  }
}
