import { Routes } from '@angular/router';
import { AportacionesListaComponent } from './aportaciones-lista/aportaciones-lista.component';
import { EditarAportacionComponent } from './editar-aportacion/editar-aportacion.component';
import { VerAportacionComponent } from './ver-aportacion/ver-aportacion.component';

export const aportacionesRoutes: Routes = [
  { path: '', component: AportacionesListaComponent },
  { path: 'agregar', component: EditarAportacionComponent },
  { path: 'editar/:id', component: EditarAportacionComponent },
  { path: 'ver/:id', component: VerAportacionComponent },
];
