import { Component, OnInit, Directive, ChangeDetectorRef, Inject, Input, ComponentRef, ElementRef, Renderer2, Injector, ComponentFactoryResolver, ViewContainerRef, HostListener } from '@angular/core';

@Component({
    selector: 'ngx-adv',
    template: `
    <div>
        <p tooltipDirective="component">Hover me!</p>
    </div>
    `,
    styles: [``]
})
export class ADVComponent implements OnInit {
    public component = ForTooltipComponent;
    constructor() { }

    ngOnInit(): void { }
}


@Component({
    selector: 'ngx-for',
    template: `for--{{content}}`,
    styles: [``]
})
export class ForTooltipComponent implements OnInit {
    public content = Math.random();
    constructor(public cd: ChangeDetectorRef) { }

    ngOnInit(): void { }
}

@Component({
    selector: 'ngx-tooltip',
    template: `
    <div>
        服务来的random：{{random}},
        下面是投影：
        <ng-content></ng-content>
    </div>
    `,
    styles: [``]
})
export class ToolTipComponent implements OnInit {
    public random;
    constructor(
        @Inject('tooltipConfig') private config,
        public cd: ChangeDetectorRef,
        private element: ElementRef,) { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        setTimeout(() => {
            console.dir(this.element.nativeElement.querySelector('ngx-for'));
            this.random = this.config.random;
            // this.cd.detectChanges();
        }, 0);
    }
}


@Directive({
    selector: '[tooltipDirective]',
})
export class TooltipDirective {
    @Input('tooltipInput') content: any;
    private componentRef: ComponentRef<ToolTipComponent>;
    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
        private injector: Injector,
        private resolver: ComponentFactoryResolver,
        private vcr: ViewContainerRef
    ) { }

    @HostListener('mouseenter')
    mouseenter() {
        const factory = this.resolver.resolveComponentFactory(ToolTipComponent);
        const injector = Injector.create([{
            provide: 'tooltipConfig',
            useValue: {
                random: 0
            }
        }]);
        this.componentRef = this.vcr.createComponent(factory, undefined, injector, this.getContentProjection());
    }

    private getContentProjection(): any {
        const factory = this.resolver.resolveComponentFactory(ForTooltipComponent);
        const componentRef = factory.create(this.injector);
        (componentRef.instance).cd.detectChanges();
        // return [[componentRef._viewRef.rootNodes[0]]]
        return [[componentRef.location.nativeElement]];
    }
}