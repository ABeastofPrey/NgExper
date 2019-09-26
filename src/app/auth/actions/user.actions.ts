import { Action, createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export enum UserActionTypes {
    GetUsers = '[User] Get Users',
    GetUsersSuccess = '[User] Get Users Success'
}

export const getUsers = createAction(UserActionTypes.GetUsers);

export const getUserSuccess = createAction(UserActionTypes.GetUsersSuccess, props<{users: User[]}>());


// export class GetUsers implements Action {
//     readonly type = UserActionTypes.GetUsers;
// }

// export class GetUsersSuccess implements Action {
//     readonly type = UserActionTypes.GetUsersSuccess;
//     constructor(public payload: { users: User[] }) { }
// }

// export type UserActions = GetUsers | GetUsersSuccess;
