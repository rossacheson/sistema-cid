import { inject, Injectable } from '@angular/core';
import { del, get, post, put } from 'aws-amplify/api';
import { from, map, Observable, of, switchMap, tap } from 'rxjs';
import { API_NAME } from '../shared/constants';
import { IIndividuo } from '../../../../types/i-individuo';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  cacheService = inject(CacheService);
  private readonly apiBasePath = '/individuos';

  agregarPersona(persona: IIndividuo): Observable<IIndividuo> {
    return from(post({apiName: API_NAME, path: this.apiBasePath, options: { body: persona as any }}).response)
      .pipe(
        switchMap(res => res.body.json() as unknown as Promise<IIndividuo>),
        tap((res) => {
          this.cacheService.delete(this.apiBasePath);
          this.cacheService.set(`${this.apiBasePath}/${res.id}`, res, undefined, true);
        })
      );
  }

  editarPersona(persona: IIndividuo): Observable<boolean> {
    const apiPath = `${this.apiBasePath}/${persona.id}`;
    return from(put({apiName: API_NAME, path: apiPath, options: { body: persona as any }}).response)
      .pipe(
        switchMap(res => res.body.json() as unknown as Promise<{ status: boolean }>),
        map(res => {
          if(!res.status){
            console.error(res);
            throw new Error(`Error: ${JSON.stringify(res)}`);
          }
          return true;
        }),
        tap(() => {
          this.cacheService.delete(this.apiBasePath);
          this.cacheService.delete(apiPath);
        })
      );
  }

  getPersonas(): Observable<IIndividuo[]> {
    const cachedResponse = this.cacheService.get<IIndividuo[]>(this.apiBasePath);
    if (cachedResponse) {
      return of(cachedResponse);
    }
    return from(get({apiName: API_NAME, path: this.apiBasePath}).response)
      .pipe(
        switchMap(res => res.body.json() as unknown as Promise<IIndividuo[]>),
        map(res => {
          if(!Array.isArray(res)){
            console.error(res);
            throw new Error(`Error: ${JSON.stringify(res)}`);
          }
          return res;
        }),
        tap((res) => this.cacheService.set(this.apiBasePath, res, undefined, true))
      );
  }

  getPersona(id: string): Observable<IIndividuo> {
    const apiPath = `${this.apiBasePath}/${id}`;
    const cachedResponse = this.cacheService.get<IIndividuo>(apiPath);
    if (cachedResponse) {
      return of(cachedResponse);
    }
    return from(get({apiName: API_NAME, path: apiPath}).response)
      .pipe(
        switchMap(res => res.body.json() as unknown as Promise<IIndividuo>),
        map(res => {
          if(!res.id){
            console.error(res);
            throw new Error(`Error: ${JSON.stringify(res)}`);
          }
          return res;
        }),
        tap((res) => this.cacheService.set(apiPath, res, undefined, true))
      );
  }

  deletePersona(id: string): Observable<boolean> {
    const apiPath = `${this.apiBasePath}/${id}`;
    return from(del({apiName: API_NAME, path: apiPath}).response)
      .pipe(
        map(res => {
          if(res.statusCode !== 200){
            console.error(res);
            throw new Error(`Error: ${JSON.stringify(res)}`);
          }
          return true;
        }),
        tap(() => {
          this.cacheService.delete(this.apiBasePath);
          this.cacheService.delete(apiPath);
        })
      );
  }
}
