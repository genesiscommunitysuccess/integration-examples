import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as StateChangerSelector from '../../../store/state-changer/state-changer.selectors';
import * as StateChangerActions from '../../../store/state-changer/state-changer.actions';

@Component({
  selector: 'app-state-changer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './state-changer.component.html',
  styleUrl: './state-changer.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StateChangerComponent implements OnInit, OnDestroy {
  criteria$: Observable<string>;
  resourceName$: Observable<string>;
  criteria: string = ''
  resourceName: string = '';
  
  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {
    this.criteria$ = this.store.pipe(select(StateChangerSelector.getCriteria));
    this.resourceName$ = this.store.pipe(select(StateChangerSelector.getResourceName));
  }

  ngOnInit() {
    this.subscription.add(
      this.criteria$.subscribe(value => {
        this.criteria = value;
      })
    );

    this.subscription.add(
      this.resourceName$.subscribe(value => {
        this.resourceName = value;
      })
    );
  }

  updateCriteria() {
    this.store.dispatch(StateChangerActions.setCriteria({ criteria: this.criteria }));
  }

  updateResourceName() {
    this.store.dispatch(StateChangerActions.setResourceName({ resourceName: this.resourceName }));
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
