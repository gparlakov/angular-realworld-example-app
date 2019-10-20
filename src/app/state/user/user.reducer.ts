import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../core';
import { loadUserSuccess, loadUser, loadUserFailure } from './user.actions';
import { TypedAction, ActionType } from '@ngrx/store/src/models';

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
  }))
);


export const userState = createFeatureSelector<State>(userFeatureKey);
export const userSelector = createSelector(userState, s => s.user);
