import { Routes } from '@angular/router';
import { PersonasListaComponent } from './personas-lista/personas-lista.component';
import { EditarPersonaComponent } from './editar-persona/editar-persona.component';

export const personasRoutes: Routes = [
  { path: '', component: PersonasListaComponent },
  { path: 'agregar', component: EditarPersonaComponent },
  { path: 'editar/:id', component: EditarPersonaComponent },
];
