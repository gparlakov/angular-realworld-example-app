import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { clearUser, loadUser } from '../../state/user/user.actions';
import { userSelector } from '../../state/user/user.reducer';
import { User } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';


@Injectable()
export class UserService {
  public currentUser = this.store.pipe(select(userSelector));

  public isAuthenticated = this.currentUser.pipe(
    map(u => u && u !== User.empty && u.token !== null)
  );
  user: User;

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private store: Store<any>
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.store.dispatch(loadUser());
    } else {
      this.store.dispatch(clearUser());
    }

    this.currentUser.subscribe(u => (this.user = u));
  }

  // kept for backwards compatibility
  purgeAuth() {
    // let the effects handle this
    this.store.dispatch(clearUser());
  }

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
