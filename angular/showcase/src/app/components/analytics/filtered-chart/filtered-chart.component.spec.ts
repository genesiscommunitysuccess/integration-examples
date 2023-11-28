import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredChartComponent } from './filtered-chart.component';

describe('FilteredChartComponent', () => {
  let component: FilteredChartComponent;
  let fixture: ComponentFixture<FilteredChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilteredChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
