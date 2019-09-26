import { createReducer, on, Action } from '@ngrx/store';
import { newFoo } from './foo.actions';
import { State, initialState } from './foo.state';

const createFoo = (state: State) => ({
    ...state,
    fooBar: true,
    foo: state.foo + 1
});

const fooReducer = createReducer(initialState, on(newFoo, createFoo));

export function reducer(state: State | undefined, action: Action) {
    return fooReducer(state, action);
}

// export const reducer = (state: State | undefined, action: Action) => createReducer(initialState, on(newFoo, createFoo))(state, action);
