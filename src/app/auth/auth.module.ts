import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { UserListComponent } from './containers/user-list/user-list.component';
import { UserDetialsComponent } from './components/user-details/user-details.component';
import { usersFeatureKey, reducer as userReducer } from './reducers/user.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../shared/services/in-memory-data.service';
import { UserService } from './services/user.service';
import { UserEffect } from './effects/user.effect';

@NgModule({
    declarations: [UserListComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        StoreModule.forFeature(usersFeatureKey, userReducer),
        EffectsModule.forFeature([UserEffect]),
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService,
            {
                dataEncapsulation: false,
                passThruUnknownUrl: true,
                delay: 1000,
                put204: false // return entity after PUT/update
            }
        ),
    ],
    exports: [],
    providers: [UserService],
})
export class AuthModule { }