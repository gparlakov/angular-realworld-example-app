import { Component, OnInit } from '@angular/core';

import { User, UserService } from '../../core';
import { State, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { userSelector } from '../../state';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<User> = this.store.pipe(select(s => userSelector(s)));

  constructor(private userService: UserService, private store: State<any>) {}

  currentUser: User;

  ngOnInit() {
    this.userService.currentUser.subscribe(userData => {
      this.currentUser = userData;
    });
  }
}
