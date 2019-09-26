import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[ngxVirtualTableHost]',
})
export class VirtualTableHostDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}