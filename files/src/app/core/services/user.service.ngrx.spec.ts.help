import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { autoSpy } from 'autoSpy';
import { of, throwError } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { clearUser } from 'src/app/state/user/user.actions';
import { userFeatureKey } from 'src/app/state/user/user.reducer';
import { subscribe } from 'src/app/testing/subscribe-in-test';
import { State } from '../../state';
import { State as UserState } from '../../state/user/user.reducer';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { UserService } from './user.service';

describe('UserService', () => {
  it('when user is empty isAuthenticated returns false', () => {
    // arrange
    const { build } = setup()
      .default()
      .withStoreUserStatePatch({ user: User.empty });
    const c = build();
    // act
    const userValues = subscribe(c.isAuthenticated, 1);

    // assert
    expect(userValues).toEqual([false]);
  });

  it('when user has token isAuthenticated returns true', () => {
    // arrange
    const { build } = setup()
      .default()
      .withStoreUserStatePatch({ user: { token: 'some token' } as User });
    const c = build();
    // act
    const userValues = subscribe(c.isAuthenticated, 2);

    // assert
    expect(userValues).toEqual([true]);
  });

  it('when purgeAuth called it should dispatch a clearUser action', () => {
    // arrange
    const { build, store } = setup().default();
    const s = build();
    //                                                   vvv skip the initial action [NgRx] Store init
    const actions = subscribe(store.scannedActions$.pipe(skip(1)), 1);
    // act
    s.purgeAuth();
    // assert
    expect(actions).toEqual([clearUser()]);
  });
});

function setup() {
  const apiService = autoSpy(ApiService);
  const http = autoSpy(HttpClient);
  const jwtService = autoSpy(JwtService);

  // in order to use the provideMockStore function from the store testing utilities
  // we need a Module  so create one
  TestBed.configureTestingModule({
    providers: [
      provideMockStore<State>({
        initialState: {
          [userFeatureKey]: { user: User.empty, loading: false }
        }
      })
    ]
  });
  const store: MockStore<State> = TestBed.get(Store);

  const builder = {
    apiService,
    http,
    jwtService,
    store,
    withUserResponse(v?: User | Error, method: 'GET' | 'POST' = 'GET') {
      const response =
        v instanceof Error || v === undefined ? throwError(v) : of({ user: v || {} });

      if (method === 'GET') {
        apiService.get.mockReturnValue(response);
      } else {
        apiService.post.mockReturnValue(response);
      }
      return builder;
    },
    withStoredToken(t: string | undefined) {
      jwtService.getToken.mockReturnValue(t);
      return builder;
    },
    withStoreUserStatePatch(u: Partial<UserState>) {
      store
        .pipe(take(1))
        .subscribe(s => store.setState({ ...s, [userFeatureKey]: { ...s[userFeatureKey], ...u } }));
      return builder;
    },
    default() {
      return builder;
    },
    build() {
      return new UserService(apiService, http, jwtService, store);
    }
  };

  return builder;
}
