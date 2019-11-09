import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { userFeatureKey, State as UserState, reducer as userReducer } from './user/user.reducer';

export interface State {
  [userFeatureKey]: UserState;
}

export const reducers: ActionReducerMap<State> = {
  [userFeatureKey]: userReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const userState = (state: State) => state[userFeatureKey];
export const userSelector = createSelector(userState, u => u.user);
