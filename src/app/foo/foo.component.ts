import { Component, OnInit, DoCheck, ChangeDetectionStrategy, NgZone, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLastStateTransitions, selectProjectedValues } from './foo.selector';
import { newFoo } from './foo.actions';
import { FooService } from './foo.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-foo',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div>
        <code><pre>{{ fooStore | async | json }}</pre></code>
        <button (click)="add()">give me a value</button>
        <button (click)="release()">release</button>
        <span>{{count}}</span>
        
        <ul>
        <li 
            *ngFor="let i of arr; index as ii; trackBy: trackFunc">
            {{i.id}} / {{ i.name }}
        </li>
        </ul>
        <button (click)="addItem()">添加</button>
    </div>
    `,
    styles: [``]
})
export class FooComponent implements OnInit, DoCheck, OnChanges {
    @Input() inputAttr: Observable<{ count: number }>;
    public count: number = -1;
    public fooStore: any;
    public userList: Observable<any>;
    public arr = [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
        { id: 3, name: 'c' },
        { id: 4, name: 'e' }
    ];
    constructor(
        private store: Store<any>,
        private service: FooService,
        private zone: NgZone,
        private cd: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.fooStore = this.store.pipe(selectLastStateTransitions());
        // this will not trigger change detection.
        this.zone.runOutsideAngular(() => {
            // setInterval(() => {
            //     // console.log('inverval');
            // }, 1000);
        });
        // this.cd.detach();
        this.inputAttr.subscribe(res => {
            this.count = res.count;
            console.log(this.count);
            // this.cd.markForCheck();
        })
    }

    ngOnChanges(change: SimpleChanges): void {
        console.log(change);
    }

    ngDoCheck(): void {
        console.log('do check foo');
    }

    public add(): void {
        this.store.dispatch(newFoo());
    }

    public release(): void {
        // selectProjectedValues.release();
        this.cd.detectChanges();
        // this.cd.reattach();
    }

    public addItem(): void {
        const last = this.arr[this.arr.length - 1];
        this.arr.unshift({
            id: last.id, // 新加的元素id与开始定义的最后一个元素id相同，请注意！
            name: Math.random().toString() // 新加的元素name是随机字符
        });
    }

    public trackFunc(index: number, item: any): any {
        // return index;
        // return item.id;
        return item.name;
    }
}
