import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLayout } from './default.layout';

describe('DefaultComponent', () => {
  let component: DefaultLayout;
  let fixture: ComponentFixture<DefaultLayout>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultLayout]
    });
    fixture = TestBed.createComponent(DefaultLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
