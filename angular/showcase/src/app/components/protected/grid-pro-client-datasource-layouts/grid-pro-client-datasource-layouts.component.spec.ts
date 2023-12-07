import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridProClientDatasourceLayoutsComponent } from './grid-pro-client-datasource-layouts.component';

describe('GridProClientDataSourceLayoutsComponent', () => {
  let component: GridProClientDatasourceLayoutsComponent;
  let fixture: ComponentFixture<GridProClientDatasourceLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridProClientDatasourceLayoutsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridProClientDatasourceLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
