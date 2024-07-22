import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlApiComponent } from './html-api.component';

describe('HtmlTemplateComponent', () => {
  let component: HtmlApiComponent;
  let fixture: ComponentFixture<HtmlApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtmlApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
