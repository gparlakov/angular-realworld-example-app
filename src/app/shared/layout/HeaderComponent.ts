import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, UserService } from '../../core';
import { State, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { userSelector } from '../../state';
@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser$: Observable<User> = this.store.pipe(select(s => userSelector(s)));
  subs = new Subscription();
  constructor(private userService: UserService, private store: State<any>) { }
  currentUser: User;
  ngOnInit() {
    const s = this.userService.currentUser.subscribe(userData => {
      this.currentUser = userData;
    });
    this.subs.add(s);
  }
}
