import { Injectable } from '@angular/core';
import { get } from 'aws-amplify/api';
import { from, switchMap } from 'rxjs';
import { API_NAME } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  getNotes() {
    return from(get({apiName: API_NAME, path: '/notes'}).response)
      .pipe(switchMap(res => res.body.json()));
  }
}
