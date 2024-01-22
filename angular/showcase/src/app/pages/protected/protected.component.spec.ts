import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import * as StateChangerSelector from '../../store/state-changer/state-changer.selectors';

import { ProtectedComponent } from './protected.component';

describe('ProtectedComponent', () => {
  let component: ProtectedComponent;
  let fixture: ComponentFixture<ProtectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProtectedComponent],
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [
            { selector: StateChangerSelector.getCriteria, value: 'initial-criteria' },
            { selector: StateChangerSelector.getResourceName, value: 'initial-resource-name' },
          ],
        }),
      ],
    });
    fixture = TestBed.createComponent(ProtectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
