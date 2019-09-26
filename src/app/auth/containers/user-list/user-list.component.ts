import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { selectFirstTwoUser, allUser } from '../../selectors/user.selector';
import { getUsers } from '../../actions/user.actions';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
    public userList: Observable<User[]>;
    constructor(private store: Store<User>) {
        // this.userList = this.store.pipe(selectFirstTwoUser);
        this.userList = this.store.select(allUser);
    }

    ngOnInit(): void {
        this.store.dispatch(getUsers());
    }
}
