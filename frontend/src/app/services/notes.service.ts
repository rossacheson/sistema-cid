import { Injectable } from '@angular/core';
import { get } from 'aws-amplify/api';
import { getUrl } from 'aws-amplify/storage';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { API_NAME } from '../shared/constants';
import { Note } from '../../../../types/note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  getNotes(): Observable<Note[]> {
    return from(get({apiName: API_NAME, path: '/notes'}).response)
      .pipe(switchMap(res => res.body.json() as unknown as Promise<Note[]>));
  }
  getNote(noteId: string): Observable<Note> {
    return from(get({apiName: API_NAME, path: `/notes/${noteId}`}).response)
      .pipe(
        switchMap(res => res.body.json() as unknown as Promise<Note>),
        switchMap(note => {
          if(note.attachment) {
            return this.getNoteAttachmentUrl(note.attachment)
              .pipe(map(url => {
                note.attachmentURL = url;
                return note;
              }))
          } else {
           return of(note);
          }
        })
      );
  }

  private getNoteAttachmentUrl(attachment: string): Observable<string> {
    return from(getUrl({
      path: ({identityId}) => `private/${identityId}/${attachment}`
    }))
      .pipe(map(res => res.url.toString()));
  }
}
