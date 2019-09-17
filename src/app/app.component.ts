import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLastStateTransitions } from './foo/foo.selector';
import { newFoo } from './foo/foo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NgExper';
  public fooStore: any;
  
  constructor(private store: Store<any>) { }

  ngOnInit() {
    // this.fooStore = this.store.pipe(selectLastStateTransitions());
  }

  public add(): void {
    // this.store.dispatch(newFoo());
  }
}
