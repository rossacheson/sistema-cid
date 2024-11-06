import { Component, inject, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {
  notesService = inject(NotesService);
  ngOnInit() {
    this.notesService.getNotes().subscribe(notes => {
      console.log(notes);
    })
  }

}
