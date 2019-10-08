import {
    Component, Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnInit, OnChanges,
    AfterContentInit,
    AfterContentChecked,
    ViewChild, ContentChildren,
    QueryList, ComponentFactoryResolver,
    ElementRef, IterableDiffers
} from '@angular/core';
import { isArray, isEmptyArray } from 'ramda-adjunct';
import { ifElse, bind, forEach, compose, tap, tryCatch } from 'ramda';
import { NgxVirtualRowComponent } from '../virtual-row/virtual-row.component';
import { VirtualTableHostDirective } from '../../directives/ngx-table-host.directive';

@Component({
    selector: 'ngx-virtual-table',
    templateUrl: './virtual-table.component.html',
    styleUrls: ['./virtual-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxVirtualTableComponent implements OnInit, OnChanges, AfterContentInit, AfterContentChecked {
    public condition = false;
    @Input() data: any[];
    @ViewChild(VirtualTableHostDirective, { static: true }) tableHost: VirtualTableHostDirective;
    @ContentChildren(NgxVirtualRowComponent) childRows !: QueryList<NgxVirtualRowComponent>;
    constructor(
        private resolver: ComponentFactoryResolver,
        private detector: ChangeDetectorRef,
        private elementRef: ElementRef
    ) { }

    ngOnInit(): void {
        // console.log('tableHost');
        // console.log(this.tableHost);
    }

    ngOnChanges(): void {
        const typeError = () => { throw new TypeError('Provide an array as <ngx-virtual-table> data.'); };
        const typeCheck = ifElse(isArray, () => { }, typeError);
        typeCheck(this.data);
    }

    ngAfterContentInit(): void {
        // const undefindRowErr = () => { throw new Error('<ngx-virtual-table> should use with <ngx-virtual-row>.'); };
        // const renderRowErr = e => { throw new Error(`Something gets wrong when render <ngx-virtual-row>: ${e}`); };
        // const renderChildRows = bind(this.renderRows, this);
        // const tryRenderChildRows = tryCatch(renderChildRows, renderRowErr);
        // const definedRowCheck = ifElse(isEmptyArray, undefindRowErr, tryRenderChildRows);
        // definedRowCheck(this.childRows.toArray());
        this.test();
    }

    ngAfterContentChecked(): void {
        // console.log('ngAfterContentChecked');
    }

    private renderRows(): void {
        const row = this.elementRef.nativeElement.querySelector('ngx-virtual-row');
        const { childNodes } = row;
        const rowFactory = this.resolver.resolveComponentFactory(NgxVirtualRowComponent);
        const tableContainerRef = this.tableHost.viewContainerRef;
        const clearContainer = () => tableContainerRef.clear();
        const renderRow = item => (<NgxVirtualRowComponent>tableContainerRef.createComponent(rowFactory, null, null, [childNodes]).instance).rowData = { item };
        const renderEachRow = forEach(renderRow);
        const _renderRows = compose(renderEachRow, tap(clearContainer));
        _renderRows(this.data);
    }

    private test(): void {
        const tableContainerRef = this.tableHost.viewContainerRef;
        tableContainerRef.clear();
        const defaultRow = this.childRows.toArray()[0];
        console.dir(defaultRow.template);
        for (let i = 0; i < 5; i++) {
            tableContainerRef.createEmbeddedView(defaultRow.template);
        }
    }
}
