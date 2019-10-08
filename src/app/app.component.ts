import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLastStateTransitions } from './foo/foo.selector';
import { newFoo } from './foo/foo.actions';
import { interval, Observable, from } from 'rxjs';
import { map, take } from "rxjs/operators";

function getRandomInt(min, max): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NgExper';
  public fooStore: any;
  public inputAttr: Observable<{count: number}>;

  public fakeUsers: User[];
  constructor(
    private store: Store<any>, 
    private zone: NgZone,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    // this.fooStore = this.store.pipe(selectLastStateTransitions());
    // let count = 0;
    // const inter = setInterval(() => {
    //   console.log('inverval app');
    //   this.inputAttr.name = String(count);
    //   this.cd.detectChanges();
    //   count++;
    //   // if (count > 3) {
    //   //   clearInterval(inter);
    //   // }
    // }, 1000);
    // this.zone.runOutsideAngular(() => {
    //   let count = 0;
    //   const inter = setInterval(() => {
    //     console.log('inverval app');
    //     this.inputAttr.name = String(count);
    //     this.cd.detectChanges();
    //     count++;
    //     // if (count > 3) {
    //     //   clearInterval(inter);
    //     // }
    //   }, 1000);
    // });
    this.inputAttr = interval(1000).pipe(map(n => ({count: n})), take(6));
    this.fakeUsers = this.initalUsers();
  }

  ngDoCheck(): void {
    // console.log('do check app');
  }

  public add(): void {
    // this.store.dispatch(newFoo());
  }

  private initalUsers(): User[] {
    return Array.from({length: 2}).map((_, n) => {
      return new User(getRandomInt(1000, 9999), `User ${n + 1}`);
    });
  }
}

class User {
  constructor(_id: number, _name: string) {
    this.id = _id;
    this.name = _name;
  }
  id: number;
  name: string
}

