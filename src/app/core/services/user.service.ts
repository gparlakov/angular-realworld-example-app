import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { clearUser, loadUser, userAuthenticated, purgeAuth } from '../../state/user/user.actions';
import { userSelector, userState } from '../../state/user/user.reducer';
import { User } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable()
export class UserService {
  public currentUser = this.store.pipe(select(userSelector));

  public isAuthenticated = this.store.pipe(
    select(userState),
    // Why filter? We can only tell that a user is authenticated or not after initialization
    // since the tokens live in local storage and the store lives in memory - so wait till initialized to answer
    // if we immediately answer - no token ergo not initialized it might be the case that
    // tokens are in local storage but have not yet been put in memory (in the Store)
    // so in effect: user is authenticated but we don't allow them in auth only pages - like Settings
    filter(u => Boolean(u) && u.initialized),
    map(u => Boolean(u.token))
  );
  user: User;

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private store: Store<any>
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.store.dispatch(userAuthenticated({ token: this.jwtService.getToken() }));
      this.store.dispatch(loadUser());
    } else {
      this.purgeAuthDo();
    }

    // to keep backwards compatibility - store a local reference to the current user object when it's emit from the store
    this.currentUser.subscribe(u => (this.user = u));
    // todo - try and change the local user and see the store `freeze` in operation
  }

  // kept for backwards compatibility
  purgeAuth() {
    this.purgeAuthDo();
  }

  private purgeAuthDo() {
    // let the effects handle this
    this.store.dispatch(purgeAuth());
    this.store.dispatch(clearUser());
  }

  /**
   *  - for type `login` - Will verify user credentials with server and emit on success
   *  - for type `register` - will try and create a user with given credentials and emit on success
   *  - for type both and failure - returned observable will emit an error
   * @param type login|register
   * @param credentials email and password
   */
  attemptAuth(type, credentials): Observable<'success'> {
    const route = type === 'login' ? '/login' : '';
    return this.apiService.post('/users' + route, { user: credentials }).pipe(
      map(
        (): 'success' => {
          this.store.dispatch(loadUser());
          return 'success';
        }
      )
    );
  }

  getCurrentUser(): User {
    return this.user;
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService.put('/user', { user }).pipe(
      map(data => {
        // Will update the currentUser observable - eventually
        this.store.dispatch(loadUser());
        return data.user;
      })
    );
  }
}
