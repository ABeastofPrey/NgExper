import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLastStateTransitions, selectProjectedValues } from './foo.selector';
import { newFoo } from './foo.actions';
import { FooService } from './foo.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-foo',
    template: `
    <div>
        <code><pre>{{ fooStore | async | json }}</pre></code>
        <code><pre>{{ userList | async | json }}</pre></code>
        <button (click)="add()">give me a value</button>
        <button (click)="release()">release</button>
        <button (click)="getHeroes()">get heroes</button>
    </div>
    `,
    styles: [``]
})
export class FooComponent implements OnInit {
    public fooStore: any;
    public userList: Observable<any>;
    constructor(private store: Store<any>, private service: FooService) { }

    ngOnInit(): void {
        this.fooStore = this.store.pipe(selectLastStateTransitions());
    }

    public add(): void {
        this.store.dispatch(newFoo());
    }

    public release(): void {
        selectProjectedValues.release();
    }

    public getHeroes(): void {
        this.userList = this.service.getHeros();
    }
}
