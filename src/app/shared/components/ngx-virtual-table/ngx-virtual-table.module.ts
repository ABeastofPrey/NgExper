import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxVirtualTableComponent } from './components/virtual-table/virtual-table.component';
import { NgxVirtualRowComponent } from './components/virtual-row/virtual-row.component';
import { NgxVirtualColumnComponent } from './components/virtual-column/virtual-column.component';
import { VirtualTableHostDirective } from './directives/ngx-table-host.directive';

import { ADVComponent, ForTooltipComponent, ToolTipComponent, TooltipDirective } from './components/adv/adv.component';
import { NgxForDirective } from './directives/ngx-unless.directive';

@NgModule({
    declarations: [
        NgxVirtualTableComponent, NgxVirtualRowComponent, NgxVirtualColumnComponent,
        VirtualTableHostDirective,
        ADVComponent, ForTooltipComponent, ToolTipComponent, TooltipDirective,
        NgxForDirective
    ],
    imports: [CommonModule],
    exports: [NgxVirtualTableComponent, NgxVirtualRowComponent, NgxVirtualColumnComponent, ADVComponent ],
    providers: [],
    entryComponents: [NgxVirtualRowComponent, ToolTipComponent, ForTooltipComponent],
})
export class NgxVirtualTableModule { }