import { Routes } from '@angular/router';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteDetailsComponent } from './note-details/note-details.component';

export const notesRoutes: Routes = [
  { path: '', component: NotesListComponent },
  { path: 'details/:id', component: NoteDetailsComponent },
];
