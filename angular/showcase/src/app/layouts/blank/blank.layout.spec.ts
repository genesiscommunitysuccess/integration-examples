import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankLayout } from './blank.layout';

describe('BlankComponent', () => {
  let component: BlankLayout;
  let fixture: ComponentFixture<BlankLayout>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlankLayout]
    });
    fixture = TestBed.createComponent(BlankLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
