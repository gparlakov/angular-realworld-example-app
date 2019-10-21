import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../../core/models/user.model';
import { clearUser, loadUser, loadUserFailure, loadUserSuccess } from './user.actions';

export const userFeatureKey = 'user';

export interface State {
  user: User;
  loading: boolean;
  error?: any;
}


export const initialState: State = { user: User.empty, loading: false };

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
  on(clearUser, state => ({...state, user: User.empty}))
);


export const userState = createFeatureSelector<State>(userFeatureKey);
export const userSelector = createSelector(userState, s => s.user);
