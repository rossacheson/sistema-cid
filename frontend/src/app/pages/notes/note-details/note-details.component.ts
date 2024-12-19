import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../../../services/notes.service';
import { Note } from '../../../../../../types/note';
import { PageLoaderComponent } from '../../../components/page-loader/page-loader.component';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [
    PageLoaderComponent,
    DatePipe
  ],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.scss'
})
export class NoteDetailsComponent implements OnInit {
  private notesService = inject(NotesService);
  private cdr = inject(ChangeDetectorRef);
  private noteId = inject(ActivatedRoute).snapshot.paramMap.get('id');
  note?: Note;
  isLoading = true;
  ngOnInit() {
    if (this.noteId) {
      this.notesService.getNote(this.noteId).subscribe(note => {
        this.note = note;
        console.log(this.note);
        this.isLoading = false;
        this.cdr.markForCheck();
      });
    }
  }
}
