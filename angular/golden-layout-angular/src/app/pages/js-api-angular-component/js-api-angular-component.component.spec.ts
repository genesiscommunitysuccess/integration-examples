import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsApiAngularComponentComponent } from './js-api-angular-component.component';

describe('JsApiAngularComponentComponent', () => {
  let component: JsApiAngularComponentComponent;
  let fixture: ComponentFixture<JsApiAngularComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsApiAngularComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsApiAngularComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
