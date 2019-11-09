import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../../core/models/user.model';
import {
  clearUser,
  loadUser,
  loadUserFailure,
  loadUserSuccess,
  userAuthenticated,
  purgeAuth
} from './user.actions';

export const userFeatureKey = 'user';

export interface State {
  user: User;
  loading: boolean;
  initialized: boolean;
  error?: any;
  token?: string;
}

export const initialState: State = { user: User.empty, loading: false, initialized: false };

export const reducer = createReducer(
  initialState,
  on(loadUser, state => ({ ...state, loading: true })),
  on(loadUserSuccess, (state, action) => ({ ...state, user: action.data, loading: false })),
  on(loadUserFailure, (state, action) => ({
    ...state,
    user: User.empty,
    loading: false,
    error: action.error
  })),
  on(clearUser, state => ({ ...state, user: User.empty })),
  on(userAuthenticated, (state, action) => ({ ...state, token: action.token, initialized: true })),
  on(purgeAuth, state => ({ ...state, token: undefined, initialized: true }))
);

export const userState = createFeatureSelector<State>(userFeatureKey);
export const userSelector = createSelector(
  userState,
  s => s.user
);
