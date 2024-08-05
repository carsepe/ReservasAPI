import { Routes } from '@angular/router';
import { ReservaListComponent } from './components/reserva-list/reserva-list.component';
import { ReservaCreateComponent } from './components/reserva-create/reserva-create.component';

export const routes: Routes = [
  { path: '', component: ReservaListComponent },
  { path: 'crear-reserva', component: ReservaCreateComponent }
];
