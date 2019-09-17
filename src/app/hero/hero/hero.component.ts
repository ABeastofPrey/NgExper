import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../reducers/hero.reducer';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero.model';

import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  public heroList: Observable<Hero[]>;

  constructor(private store: Store<fromStore.State>, private http: HttpClient) { }

  ngOnInit() {
    this.getHeroes();
  }

  private getHeroes(): void {
    this.heroList = this.http.get<Hero[]>('api/heroes').pipe(catchError(err => {
      console.warn(err);
      return new Observable<Hero[]>();
    }));
  }

}
