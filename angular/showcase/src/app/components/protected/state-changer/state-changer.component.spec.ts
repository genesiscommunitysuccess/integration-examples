import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { StateChangerComponent } from './state-changer.component';
import * as StateChangerSelector from '../../../store/state-changer/state-changer.selectors';

describe('StateChangerComponent', () => {
  let component: StateChangerComponent;
  let fixture: ComponentFixture<StateChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateChangerComponent],
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [
            { selector: StateChangerSelector.getCriteria, value: 'initial-criteria' },
            { selector: StateChangerSelector.getResourceName, value: 'initial-resource-name' },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StateChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
