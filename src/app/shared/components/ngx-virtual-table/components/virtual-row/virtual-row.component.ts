import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'ngx-virtual-row',
    templateUrl: './virtual-row.component.html',
    styleUrls: ['./virtual-row.component.scss']
})
export class NgxVirtualRowComponent implements OnInit {
    @Input() rowData: any;
    @ViewChild('rowTemplate', {static: true})
    public template: TemplateRef<any>

    constructor() { }

    ngOnInit(): void {
        console.log(this.rowData);
        
    }
}
