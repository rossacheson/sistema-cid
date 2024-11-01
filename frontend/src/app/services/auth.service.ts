import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { BehaviorSubject, from, Observable, tap } from 'rxjs';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { SESSION_KEY } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated$: BehaviorSubject<boolean>;
  isAuthenticated$: Observable<boolean>;

  constructor() {
    const sessionString = sessionStorage.getItem(SESSION_KEY);
    this._isAuthenticated$ = new BehaviorSubject<boolean>(!!sessionString);
    this.isAuthenticated$ = this._isAuthenticated$.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return from(Auth.signIn(email, password))
      .pipe(tap(response => {
        console.log(response);
        this._isAuthenticated$.next(true);
      }));
  }

  logout(): Observable<any> {
    return from(Auth.signOut())
      .pipe(tap(() => {
        this._isAuthenticated$.next(false);
        sessionStorage.removeItem(SESSION_KEY);
      }));
  }

  register(email: string, password: string): Observable<ISignUpResult> {
    return from(Auth.signUp({
      username: email,
      password: password,
    }));
  }

  confirmAccount(email: string, confirmationCode: string): Observable<any> {
    return from(Auth.confirmSignUp(email, confirmationCode))
  }
}
