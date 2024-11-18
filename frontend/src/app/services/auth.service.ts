import { Injectable } from '@angular/core';
import {
  confirmSignUp,
  signIn,
  signOut,
  signUp
} from 'aws-amplify/auth';
import { BehaviorSubject, from, Observable, tap } from 'rxjs';
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

  login(email: string, password: string) {
    return from(signIn({username: email, password}))
      .pipe(tap(response => {
        if(response.isSignedIn) {
          console.log(response);
          this._isAuthenticated$.next(true);
        } else {
          console.log('signIn unsuccessful');
        }
      }));
  }

  logout() {
    return from(signOut())
      .pipe(tap(() => {
        this._isAuthenticated$.next(false);
        sessionStorage.removeItem(SESSION_KEY);
      }));
  }

  register(email: string, password: string) {
    return from(signUp({
      username: email,
      password,
    }));
  }

  confirmAccount(email: string, confirmationCode: string) {
    return from(confirmSignUp({username: email, confirmationCode}))
  }
}
