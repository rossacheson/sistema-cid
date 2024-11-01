import { Routes } from '@angular/router';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { PersonasComponent } from './pages/personas/personas.component';
import { NotesComponent } from './pages/notes/notes.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { isAuthenticated } from './guards/is-authenticated';
import { isNotAuthenticated } from './guards/is-not-authenticated'

export const routes: Routes = [
  { path: 'bienvenido', component: BienvenidoComponent, canActivate: [isAuthenticated] },
  { path: 'personas', component: PersonasComponent, canActivate: [isAuthenticated] },
  { path: 'notes', component: NotesComponent, canActivate: [isAuthenticated] },
  { path: 'login', component: LoginComponent, canActivate: [isNotAuthenticated] },
  { path: 'logout', component: LogoutComponent, canActivate: [isAuthenticated] },
  { path: 'registrar', component: RegistrarComponent, canActivate: [isNotAuthenticated] },
  { path: '', redirectTo: 'bienvenido', pathMatch: 'full' },
];
