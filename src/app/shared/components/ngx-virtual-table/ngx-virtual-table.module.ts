import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxVirtualTableComponent } from './components/virtual-table/virtual-table.component';
import { NgxVirtualRowComponent } from './components/virtual-row/virtual-row.component';
import { NgxVirtualColumnComponent } from './components/virtual-column/virtual-column.component';
import { VirtualTableHostDirective } from './directives/ngx-table-host.directive';

@NgModule({
    declarations: [
        NgxVirtualTableComponent, NgxVirtualRowComponent, NgxVirtualColumnComponent,
        VirtualTableHostDirective
    ],
    imports: [CommonModule],
    exports: [NgxVirtualTableComponent, NgxVirtualRowComponent, NgxVirtualColumnComponent],
    providers: [],
    entryComponents: [NgxVirtualRowComponent],
})
export class NgxVirtualTableModule { }