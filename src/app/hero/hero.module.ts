import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroRoutingModule } from './hero-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromHero from './reducers/hero.reducer';
import { HeroComponent } from './hero/hero.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../shared/services/in-memory-data.service';


@NgModule({
  declarations: [HeroComponent],
  imports: [
    CommonModule,
    HeroRoutingModule,
    StoreModule.forFeature(fromHero.heroesFeatureKey, fromHero.reducer),

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService,
      {
        dataEncapsulation: false,
        passThruUnknownUrl: true,
        delay: 1000,
        put204: false // return entity after PUT/update
      }
    )
  ]
})
export class HeroModule { }
