import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../core';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;

  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) {
    // create form group using the form builder
    this.settingsForm = this.fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    });
    // Optional: subscribe to changes on the form
    // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
  }

  ngOnInit() {
    const s = this.userService.currentUser.subscribe(u => {
      // Fill the form
      this.settingsForm.patchValue(u);
    });
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    this.userService.update(this.settingsForm.value).subscribe(
      updatedUser => this.router.navigateByUrl('/profile/' + updatedUser.username),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
