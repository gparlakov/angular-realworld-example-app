import { ApiService, User } from '../../core';
import { JwtService } from '../../core';
import { UserEffects } from './user.effects';
import { autoSpy } from 'autoSpy';
import { ReplaySubject, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { subscribe } from 'src/app/testing/subscribe-in-test';
import { loadUser, clearUser, loadUserSuccess } from './user.actions';

describe('UserEffects', () => {
  it('when [User] Load User action dispatched and there is no token should emit the empty the [User] Clear user action', () => {
    // arrange
    const { build, actions$ } = setup().default();
    const effect = build();
    const results = subscribe(effect.loadUser, 1);
    // act
    actions$.next(loadUser());
    // assert
    expect(results).toEqual([clearUser()]);
  });

  it('when [User] Load User action dispatched and there is A token should fetch the user and emit  [User] Load user Success', () => {
    // arrange
    const { build, actions$ } = setup()
      .default()
      .withToken()
      .withUser({ email: 'email' } as User);
    const effect = build();
    const results = subscribe(effect.loadUser, 1);
    // act
    actions$.next(loadUser());
    // assert
    expect(results).toEqual([loadUserSuccess({ data: { email: 'email' } as User })]);
  });

  // for cases when our Effect does NOT emit actions (i.e. {dispatch: false}) we can assert
  // the side effects have been called
  it('when [User] Clear user dispatched should call the jwt.destroyToken()', () => {
    // arrange
    const { build, actions$, jwt } = setup().default();
    const effect = build();
    subscribe(effect.clearUser, 1);
    // act
    actions$.next(clearUser());
    // assert
    expect(jwt.destroyToken).toHaveBeenCalledTimes(1);
  });
});

function setup() {
  const actions$ = new ReplaySubject<Action>(1);
  const api = autoSpy(ApiService);
  const jwt = autoSpy(JwtService);
  const builder = {
    actions$,
    api,
    jwt,
    default() {
      return builder;
    },
    build() {
      return new UserEffects(actions$, api, jwt);
    },
    withToken(t: string = 'token') {
      jwt.getToken.mockReturnValue(t);
      return builder;
    },
    withUser(u: User = {} as User) {
      // return an observable of user data simulating the API response
      api.get.mockReturnValue(of({ user: u }));
      return builder;
    }
  };

  return builder;
}
