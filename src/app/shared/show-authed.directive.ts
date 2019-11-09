import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import {Subscription } from 'rxjs';

import { UserService } from '../core';

@Directive({ selector: '[appShowAuthed]' })
export class ShowAuthedDirective implements OnInit, OnDestroy {
  private subscription = new Subscription();
  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) {}

  condition: boolean;

  ngOnInit() {
    // kill subscription on destroy
    const s = this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    );
    this.subscription.add(s);
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.viewContainer.clear();
  }

}
