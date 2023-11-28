import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridProClientDatasourceComponent } from './grid-pro-client-datasource.component';

describe('GridProClientDatasourceComponent', () => {
  let component: GridProClientDatasourceComponent;
  let fixture: ComponentFixture<GridProClientDatasourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridProClientDatasourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridProClientDatasourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
