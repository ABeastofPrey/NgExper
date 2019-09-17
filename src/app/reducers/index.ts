import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as foo from '../foo/foo.state';
import { reducer as fooReducer } from '../foo/foo.reducer';


export interface AppState {
  // [foo.featureKey]: foo.State;
}

export const reducers: ActionReducerMap<AppState> = {
  // [foo.featureKey]: fooReducer
};

export const initialState: AppState = {
  // [foo.featureKey]: foo.initialState
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
