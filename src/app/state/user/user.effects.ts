import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { map, switchMap, catchError, tap, debounceTime } from 'rxjs/operators';
import { ApiService, JwtService, User } from '../../core';
import { loadUserSuccess, clearUser, purgeAuth, loadUser } from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private api: ApiService) {}

  loadUser = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadUser),
        // don't start a new get user within 300 ms of each other
        debounceTime(300),
        switchMap(
          _ =>
            this.api
              .get('/user')
              // if get user fails - emit the empty user
              .pipe(catchError((u, e) => of({ user: User.empty }))) as Observable<{ user: User }>
        ),
        map(u =>
          u == null || u.user === User.empty ? clearUser() : loadUserSuccess({ data: u.user })
        )
      ),
    {}
  );
}
