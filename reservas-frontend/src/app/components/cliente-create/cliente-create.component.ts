// cliente-create.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent {
  @Output() clienteCreado = new EventEmitter<void>();

  clienteForm: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numeroDocumento: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      this.clienteService.createCliente(this.clienteForm.value).subscribe(() => {
        this.clienteCreado.emit();
        this.clienteForm.reset();
      });
    }
  }
}

