// servicio-create.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioService } from '../../services/servicio.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-servicio-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './servicio-create.component.html',
  styleUrls: ['./servicio-create.component.css']
})
export class ServicioCreateComponent {
  @Output() servicioCreado = new EventEmitter<void>();

  servicioForm: FormGroup;

  constructor(private fb: FormBuilder, private servicioService: ServicioService) {
    this.servicioForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.servicioForm.valid) {
      this.servicioService.createServicio(this.servicioForm.value).subscribe(() => {
        this.servicioCreado.emit();
        this.servicioForm.reset();
      });
    }
  }
}
