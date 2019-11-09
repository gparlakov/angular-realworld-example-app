import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { userFeatureKey, userSelector, reducer, initialState } from './user.reducer';
import { User } from 'src/app/core';
import { State } from '../index';
import { Store } from '@ngrx/store';
import { loadUserSuccess, loadUser } from './user.actions';

describe('User Store', () => {
  fit('should work', () => {
    const result = reducer(initialState, loadUser());
    expect(result).toEqual({ loading: true, user: {} });
  });
});
