import { Routes } from '@angular/router';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { PersonasComponent } from './pages/personas/personas.component';
import { NotesComponent } from './pages/notes/notes.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { isAuthenticated } from './guards/is-authenticated';
import { isNotAuthenticated } from './guards/is-not-authenticated'

export const routes: Routes = [
  { path: 'bienvenido', component: BienvenidoComponent, canActivate: [isAuthenticated] },
  { path: 'personas', component: PersonasComponent, canActivate: [isAuthenticated] },
  {
    path: 'notes',
    component: NotesComponent,
    canActivate: [isAuthenticated],
    loadChildren: () => import('./pages/notes/notes.routes').then(m => m.notesRoutes)
  },
  { path: 'login', component: LoginComponent, canActivate: [isNotAuthenticated] },
  { path: 'logout', component: LogoutComponent, canActivate: [isAuthenticated] },
  { path: 'registrarse', component: RegistrarseComponent, canActivate: [isNotAuthenticated] },
  { path: '', redirectTo: 'bienvenido', pathMatch: 'full' },
];
