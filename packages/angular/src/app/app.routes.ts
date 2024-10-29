import { Routes } from '@angular/router';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { PersonasComponent } from './pages/personas/personas.component';
import { NotesComponent } from './pages/notes/notes.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';

export const routes: Routes = [
  { path: 'bienvenido', component: BienvenidoComponent },
  { path: 'personas', component: PersonasComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: '', redirectTo: 'bienvenido', pathMatch: 'full' },
];
