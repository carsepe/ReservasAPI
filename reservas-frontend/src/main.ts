import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Importaciones de Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog'; // Para los diálogos/modal

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      ReactiveFormsModule,
      CommonModule,
      BrowserAnimationsModule,
      MatInputModule,
      MatSelectModule,
      MatButtonModule,
      MatTableModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatIconModule,
      MatDialogModule // Asegúrate de incluir MatDialogModule si quieres usar diálogos
    ),
    provideRouter(routes), 
    provideAnimationsAsync()
  ]
}).catch((err) => console.error(err));
