import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    template: `
     <button (click)="ok()">Yes</button>
     <button (click)="no()">Cancel</button>
     `,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class RosePartialComponent {
    constructor() {
      //
      console.log('created');
    }
    
    ok(): void {
      console.log('ok');
    }
    no(): void {
      console.log('no');
    }
  }