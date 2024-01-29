import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradesChartComponent } from './trades-chart.component';

describe('TradesChartComponent', () => {
  let component: TradesChartComponent;
  let fixture: ComponentFixture<TradesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradesChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TradesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
