import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/user.model';

export const loadUser = createAction('[User] Load User');

export const loadUserSuccess = createAction('[User] Load User Success', props<{ data: User }>());

export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: any }>());

export const clearUser = createAction('[User] Clear User');

export const userAuthenticated = createAction(
  '[User] User Is Authenticated',
  props<{ token: string }>()
);
export const purgeAuth = createAction(
  '[User] User Purge Auth (is no longer authenticated)'
);

// todo add loadUserAfterSuccessfulSignup
// todo add loadUserAfteruccessfulUpdate
