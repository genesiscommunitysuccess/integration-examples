import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsApiComponent } from './js-api.component';

describe('JsApiComponent', () => {
  let component: JsApiComponent;
  let fixture: ComponentFixture<JsApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
