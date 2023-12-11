import { Directive, ViewContainerRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { layoutComponentImportsByName } from '../config';
@Directive({
  selector: '[layoutLazyLoad]'
})
export class LayoutLazyLoadDirective implements OnInit, OnChanges  {
  @Input('layoutLazyLoad') componentName?: string;

  constructor(
    private viewContainerRef: ViewContainerRef,
    ) {}

  ngOnInit() {
    this.loadComponent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['componentName']) {
      this.loadComponent();
    }
  }

  async loadComponent() {
    this.viewContainerRef.clear();

    if (!this.componentName) {
      return;
    }

    if (!layoutComponentImportsByName[this.componentName]) {
      console.error(`Unknown component name: ${this.componentName}`);
    }

    const component = await layoutComponentImportsByName[this.componentName]();
    this.viewContainerRef.createComponent(component);
  }
}