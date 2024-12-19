import { Injectable } from '@angular/core';
import {
  confirmSignUp,
  fetchAuthSession,
  signIn,
  signOut,
  signUp,
  AuthSession
} from 'aws-amplify/auth';
import { BehaviorSubject, from, Observable, tap } from 'rxjs';
import { SESSION_KEY } from '../shared/constants';
import { UserGroup } from '../../../../types/user-group';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated$: BehaviorSubject<boolean>;
  isAuthenticated$: Observable<boolean>;
  private _userGroups$: BehaviorSubject<UserGroup[]>;
  userGroups$: Observable<UserGroup[]>;

  constructor() {
    const sessionString = sessionStorage.getItem(SESSION_KEY);
    const sessionExists = !!sessionString;
    this._isAuthenticated$ = new BehaviorSubject<boolean>(sessionExists);
    this.isAuthenticated$ = this._isAuthenticated$.asObservable();
    if(sessionExists) {
      const session: AuthSession = JSON.parse(sessionString);
      const userGroups = session.tokens?.idToken?.payload['cognito:groups'] as UserGroup[] ?? [];
      this._userGroups$ = new BehaviorSubject<UserGroup[]>(userGroups);
    } else {
      this._userGroups$ = new BehaviorSubject<UserGroup[]>([]);
    }
    this.userGroups$ = this._userGroups$.asObservable();
  }

  login(email: string, password: string) {
    return from(signIn({username: email, password}))
      .pipe(tap(response => {
        if(response.isSignedIn) {
          console.log(response);
          this._isAuthenticated$.next(true);
          this.getAndStoreSession();
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

  private getAndStoreSession(): void {
    from(fetchAuthSession()).subscribe(session => {
      if(session?.tokens) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        const userGroups = session.tokens?.idToken?.payload['cognito:groups'] as UserGroup[] ?? [];
        this._userGroups$.next(userGroups);
      } else {
        sessionStorage.removeItem(SESSION_KEY);
        this._userGroups$.next([]);
      }
    })
  }
}
