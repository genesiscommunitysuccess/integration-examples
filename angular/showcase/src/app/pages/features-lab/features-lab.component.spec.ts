import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesLabComponent } from './features-lab.component';

describe('FeaturesLabComponent', () => {
  let component: FeaturesLabComponent;
  let fixture: ComponentFixture<FeaturesLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesLabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturesLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
