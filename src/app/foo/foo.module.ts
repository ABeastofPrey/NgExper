import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FooComponent } from './foo.component';
import { featureKey, initialState } from './foo.state';
import { reducer } from './foo.reducer';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from '../shared/services/in-memory-data.service';
import { FooService } from './foo.service';

@NgModule({
  declarations: [
    FooComponent
  ],
  providers: [
    FooService
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(featureKey, reducer, { initialState }),
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {
        dataEncapsulation: false,
        passThruUnknownUrl: true,
        delay: 1000,
        put204: false // return entity after PUT/update
      }
    )
  ],
  exports: [FooComponent]
})
export class FooModule { }
