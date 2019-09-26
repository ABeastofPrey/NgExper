import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ngx-virtual-row',
    templateUrl: './virtual-row.component.html',
    styleUrls: ['./virtual-row.component.scss']
})
export class NgxVirtualRowComponent implements OnInit {
    @Input() rowData: any;

    constructor() { }

    ngOnInit(): void {
        console.log(this.rowData);
        
    }
}
