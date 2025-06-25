import { inject, Injectable } from '@angular/core';
import { del, get, post, put } from 'aws-amplify/api';
import { from, map, Observable, of, switchMap, tap } from 'rxjs';
import { API_NAME } from '../shared/constants';
import { IAportacion } from '../../../../types/i-aportacion';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class AportacionesService {
  cacheService = inject(CacheService);
  private readonly apiBasePath = '/aportaciones';

  agregarAportacion(aportacion: IAportacion): Observable<IAportacion> {
    return from(post({apiName: API_NAME, path: this.apiBasePath, options: { body: aportacion as any }}).response)
      .pipe(
        switchMap(res => res.body.json() as unknown as Promise<IAportacion>),
        tap((res) => {
          this.cacheService.delete(this.apiBasePath);
          this.cacheService.set(`${this.apiBasePath}/${res.id}`, res, undefined, true);
        })
      );
  }

  editarAportacion(aportacion: IAportacion): Observable<boolean> {
    const apiPath = `${this.apiBasePath}/${aportacion.id}`;
    return from(put({apiName: API_NAME, path: apiPath, options: { body: aportacion as any }}).response)
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

  getAportaciones(): Observable<IAportacion[]> {
    const cachedResponse = this.cacheService.get<IAportacion[]>(this.apiBasePath);
    if (cachedResponse) {
      return of(cachedResponse);
    }
    return from(get({apiName: API_NAME, path: this.apiBasePath}).response)
      .pipe(
        switchMap(res => res.body.json() as unknown as Promise<IAportacion[]>),
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

  getAportacion(id: string): Observable<IAportacion> {
    const apiPath = `${this.apiBasePath}/${id}`;
    const cachedResponse = this.cacheService.get<IAportacion>(apiPath);
    if (cachedResponse) {
      return of(cachedResponse);
    }
    return from(get({apiName: API_NAME, path: apiPath}).response)
      .pipe(
        switchMap(res => res.body.json() as unknown as Promise<IAportacion>),
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

  deleteAportacion(personaId: string, aportacionId: string): Observable<boolean> {
    const apiPath = `${this.apiBasePath}/${personaId}/${aportacionId}`;
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
