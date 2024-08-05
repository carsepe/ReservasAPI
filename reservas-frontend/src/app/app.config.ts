import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ReservaCreateComponent } from './components/reserva-create/reserva-create.component'; // Importa el componente

export const appConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(ReactiveFormsModule),
    importProvidersFrom(CommonModule),
    provideRouter(routes),
  ],
  bootstrap: [AppComponent],
};
