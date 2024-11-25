import { Injectable } from '@angular/core';
import { get, post } from 'aws-amplify/api';
import { from, Observable, switchMap } from 'rxjs';
import { API_NAME } from '../shared/constants';
import { IIndividuo } from '../../../../types/i-individuo';

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  agregarPersona(persona: IIndividuo): Observable<IIndividuo> {
    return from(post({apiName: API_NAME, path: '/individuos', options: { body: persona as any }}).response)
      .pipe(switchMap(res => res.body.json() as unknown as Promise<IIndividuo>));
  }

  getPersonas(): Observable<IIndividuo[]> {
    return from(get({apiName: API_NAME, path: '/individuos'}).response)
      .pipe(switchMap(res => res.body.json() as unknown as Promise<IIndividuo[]>));
  }

  getPersona(id: string): Observable<any> {
    return from(get({apiName: API_NAME, path: `/individuos/${id}`}).response)
      .pipe(
        switchMap(res => res.body.json() as unknown as Promise<IIndividuo>),
      );
  }
}
