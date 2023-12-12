import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankLayoutComponent } from './blank.layout';

describe('BlankLayoutComponent', () => {
  let component: BlankLayoutComponent;
  let fixture: ComponentFixture<BlankLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlankLayoutComponent],
    });
    fixture = TestBed.createComponent(BlankLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
