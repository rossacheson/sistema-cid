import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { NotesService } from '../../../services/notes.service';
import { Note } from '../../../../../../types/note';
import { PageLoaderComponent } from '../../../components/page-loader/page-loader.component';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [
    PageLoaderComponent,
    MatGridList,
    MatGridTile,
    RouterLink
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesListComponent  implements OnInit {
  private notesService = inject(NotesService);
  private cdr = inject(ChangeDetectorRef);
  notes: Note[] = [];
  isLoading = true;
  ngOnInit() {
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
      this.isLoading = false;
      this.cdr.markForCheck();
    })
  }
}
