// import { UserActionTypes, UserActions } from '../actions/user.actions';
import { getUserSuccess } from '../actions/user.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { State, initialState, adapter } from '../entities/user.entity';

export const usersFeatureKey = 'users';

// export function reducer(state = initialState, action: UserActions): State {
//     switch (action.type) {
//         case UserActionTypes.GetUsersSuccess: {
//             return adapter.addAll(action.payload.users, state);
//         }
//         default: {
//             return state;
//         }
//     }
// }

export const userReducer = createReducer(
    initialState,
    on(getUserSuccess, (state, { users }) => adapter.addAll(users, state))
);

export function reducer(state: State, action: Action): State {
    return userReducer(state, action);
};

export const {
    selectIds: selectUserIds,
    selectEntities: selectUserEntitis,
    selectAll: selectAllUser,
    selectTotal: selectTotalUser,
} = adapter.getSelectors();

export const getSelectedUserId = (state: State) => state.selectedUserId;
