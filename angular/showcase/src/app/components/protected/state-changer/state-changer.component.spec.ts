import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateChangerComponent } from './state-changer.component';

describe('StateChangerComponent', () => {
  let component: StateChangerComponent;
  let fixture: ComponentFixture<StateChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateChangerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StateChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
