import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridTabulatorClientDatasourceComponent } from './grid-tabulator-client-datasource.component';

describe('GridTabulatorClientDatasourceComponent', () => {
  let component: GridTabulatorClientDatasourceComponent;
  let fixture: ComponentFixture<GridTabulatorClientDatasourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridTabulatorClientDatasourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridTabulatorClientDatasourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
