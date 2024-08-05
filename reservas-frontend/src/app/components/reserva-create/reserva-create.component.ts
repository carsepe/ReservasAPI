import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reserva-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reserva-create.component.html',
  styleUrls: ['./reserva-create.component.css']
})
export class ReservaCreateComponent implements OnInit, OnChanges {
  @Input() clientes: any[] = [];
  @Input() servicios: any[] = [];
  @Input() reserva: any = null;
  @Output() reservaCreada = new EventEmitter<void>();

  reservaForm: FormGroup;

  constructor(private fb: FormBuilder, private reservaService: ReservaService) {
    this.reservaForm = this.fb.group({
      clienteId: ['', Validators.required],
      servicioId: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.patchForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reserva']) {
      this.patchForm();
    }
  }

  patchForm(): void {
    if (this.reserva) {
      this.reservaForm.patchValue({
        clienteId: this.reserva.clienteId,
        servicioId: this.reserva.servicioId,
        fecha: this.reserva.fecha
      });
    } else {
      this.reservaForm.reset();
    }
  }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      if (this.reserva) {
        // Actualizar reserva existente
        const reservaActualizada = {
          ...this.reserva,
          ...this.reservaForm.value
        };
        this.reservaService.updateReserva(this.reserva.id, reservaActualizada).subscribe(() => {
          this.reservaCreada.emit();
          this.reservaForm.reset();
        }, error => {
          console.error('Error al actualizar la reserva: ', error);
        });
      } else {
        // Crear nueva reserva
        this.reservaService.createReserva(this.reservaForm.value).subscribe(() => {
          this.reservaCreada.emit();
          this.reservaForm.reset();
        }, error => {
          console.error('Error al crear la reserva: ', error);
        });
      }
    }
  }
}
