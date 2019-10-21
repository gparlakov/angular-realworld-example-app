import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { ApiService, JwtService, User } from '../../core';
import { loadUserSuccess, clearUser } from './user.actions';

@Injectable()
export class UserEffects {
  loadUser = createEffect(
    () =>
      this.actions$.pipe(
        ofType('[User] Load User'),
        switchMap(_ => {
          return this.jwt.getToken()
            ? (this.api
                .get('/user')
                // if get user fails - emit the empty user
                .pipe(catchError((u, e) => of({ user: User.empty }))) as Observable<{ user: User }>)
            : // if no tokens - emit the empty user
              of({ user: User.empty });
        }),
        map(u =>
          u == null || u.user === User.empty ? clearUser() : loadUserSuccess({ data: u.user })
        )
      ),
    {}
  );

  clearUser = createEffect(
    () =>
      this.actions$.pipe(
        ofType('[User] Clear User'),
        tap(() => this.jwt.destroyToken())
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private api: ApiService, private jwt: JwtService) {}
}
