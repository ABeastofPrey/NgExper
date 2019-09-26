import { createSelector, createFeatureSelector, select } from '@ngrx/store';
import { selectAllUser, usersFeatureKey } from '../reducers/user.reducer';
import { State as UserState } from '../entities/user.entity';
import { pipe } from 'rxjs';
import { scan } from 'rxjs/operators';
import { User } from '../models/user.model';

export const userState = createFeatureSelector<UserState>(usersFeatureKey);

export const allUser = createSelector(userState, selectAllUser);

export const selectFirstTwoUser = pipe(
    select(allUser), scan((acc, curr) => {
        return curr.length > 0 ? acc.concat(curr[0], curr[1]) : [];
    }, [] as User[])
);
