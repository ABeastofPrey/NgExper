import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HeroService } from '../services/hero.service';
import * as heroActions from '../actions/hero.actions';
import { switchMap, map, catchError } from 'rxjs/operators';


@Injectable()
export class HeroEffects {

  constructor(
    private actions$: Actions,
    private service: HeroService) { }

  @Effect()
  getHeroes$ = this.actions$.pipe(
    ofType(heroActions.HeroActionTypes.GetHeros),
    switchMap(() => this.service.getHeroes()),
    map(response => new heroActions.LoadHeros({ heros: response }))
  )
}
