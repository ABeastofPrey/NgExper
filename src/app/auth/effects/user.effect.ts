import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserActionTypes, /* GetUsersSuccess, */ getUserSuccess } from '../actions/user.actions';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class UserEffect {
    constructor(private actions$: Actions, private service: UserService) { }

    @Effect()
    getUsers = this.actions$.pipe(
        ofType(UserActionTypes.GetUsers),
        switchMap(() => this.service.getUsers()),
        // map(response => new GetUsersSuccess({ users: response }))
        map(response => getUserSuccess({ users: response }))
    );

}