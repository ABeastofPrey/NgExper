import { Component, OnInit } from '@angular/core';
import { Store, createAction } from '@ngrx/store';
import * as fromStore from '../reducers/hero.reducer';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero.model';
import { selectAllHeroes } from '../selectors/hero.selector';
import * as heroActions from '../actions/hero.actions';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  public heroState: Observable<Hero[]>;

  constructor(private store: Store<fromStore.State>) { }

  ngOnInit() {
    this.heroState = this.store.select(selectAllHeroes);
  }

  public getAll(): void {
    this.store.dispatch(new heroActions.GetHeroes());
  }

}

// https://stackblitz.com/edit/tour-of-heroes-ngrx-entity?file=src%2Fentities%2Fheroes%2Fhero-effects.ts
