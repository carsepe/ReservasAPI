import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reserva-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reserva-edit.component.html',
  styleUrls: ['./reserva-edit.component.css']
})
export class ReservaEditComponent implements OnInit {
  @Input() reserva: any;
  @Input() clientes: any[] = [];
  @Input() servicios: any[] = [];
  @Output() reservaActualizada = new EventEmitter<void>();

  reservaForm: FormGroup;

  constructor(private fb: FormBuilder, private reservaService: ReservaService) {
    this.reservaForm = this.fb.group({
      clienteId: ['', Validators.required],
      servicioId: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.reservaForm.patchValue({
      clienteId: this.reserva.clienteId,
      servicioId: this.reserva.servicioId,
      fecha: this.reserva.fecha
    });
  }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      this.reservaService.updateReserva(this.reserva.id, this.reservaForm.value).subscribe(() => {
        this.reservaActualizada.emit();
        this.reservaForm.reset();
      });
    }
  }
}
