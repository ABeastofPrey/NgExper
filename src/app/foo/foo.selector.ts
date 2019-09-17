import { createSelector, createFeatureSelector, select } from '@ngrx/store';
import { State, featureKey } from './foo.state';
import { AppState } from '../reducers/index';
import { scan } from 'rxjs/operators';
import { pipe } from 'rxjs';


// export const selectFoo = createFeatureSelector<AppState, State>(featureKey);
export const selectFoo = createFeatureSelector<State>(featureKey);

export const selectFooBar = createSelector(selectFoo, state => state.bar);

export const selectFooFoo = createSelector(selectFoo, state => state.foo);

export const selectFooFooBar = createSelector(selectFoo, state => state.fooBar);

export const selectProjectedValues = createSelector(selectFooBar, selectFooFoo, (bar, foo) => {
    if (foo && bar) {
        return { foo, bar };
    }
    return undefined;
});

export const selectLastStateTransitions = () => pipe(select(selectProjectedValues), scan((acc, curr) => {
    return [curr, acc[0], acc[1]].filter(val => val !== undefined);
}, [] as { foo: number; bar: string }[]));