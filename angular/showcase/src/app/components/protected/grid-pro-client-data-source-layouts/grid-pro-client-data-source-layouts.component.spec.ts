import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridProClientDataSourceLayoutsComponent } from './grid-pro-client-data-source-layouts.component';

describe('GridProClientDataSourceLayoutsComponent', () => {
  let component: GridProClientDataSourceLayoutsComponent;
  let fixture: ComponentFixture<GridProClientDataSourceLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridProClientDataSourceLayoutsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridProClientDataSourceLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
