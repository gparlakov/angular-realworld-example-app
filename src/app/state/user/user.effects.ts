import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApiService, JwtService, User } from '../../core';
import { loadUserSuccess } from './user.actions';

@Injectable()
export class UserEffects {
  loadUser = createEffect(
    () =>
      this.actions$.pipe(
        ofType('[User] Load User'),
        switchMap(_ => {
          return this.jwt.getToken()
            ? (this.api.get('/user') as Observable<{ user: User }>)
            : of({ user: User.empty });
        }),
        map(u => loadUserSuccess({ data: u.user }))
      ),
    {}
  );

  constructor(private actions$: Actions, private api: ApiService, private jwt: JwtService) {}
}
