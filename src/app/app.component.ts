import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLastStateTransitions } from './foo/foo.selector';
import { newFoo } from './foo/foo.actions';
import { interval, Observable, from } from 'rxjs';
import { map, take } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NgExper';
  public fooStore: any;
  public inputAttr: Observable<{count: number}>;

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
  }

  ngDoCheck(): void {
    console.log('do check app');
  }

  public add(): void {
    // this.store.dispatch(newFoo());
  }
}
