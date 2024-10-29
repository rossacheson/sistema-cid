import { Routes } from '@angular/router';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { PersonasComponent } from './pages/personas/personas.component';

export const routes: Routes = [
  { path: 'personas', component: PersonasComponent },
  { path: 'bienvenido', component: BienvenidoComponent },
  { path: '', redirectTo: 'bienvenido', pathMatch: 'full' },
];
