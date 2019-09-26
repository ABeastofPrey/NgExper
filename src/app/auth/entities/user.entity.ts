import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../models/user.model';

export interface State extends EntityState<User> {
    selectedUserId: number
}

export const adapter: EntityAdapter<User> = createEntityAdapter({
    // selectId: selectUserId,
    // sortComparer: sortByName
});

export const initialState: State = adapter.getInitialState({
    selectedUserId: null
});