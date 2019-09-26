import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ngx-virtual-column',
    templateUrl: './virtual-column.component.html',
    styleUrls: ['./virtual-column.component.scss']
})
export class NgxVirtualColumnComponent implements OnInit {
    @Input() columnData: any;

    constructor() { }

    ngOnInit(): void { }
}
