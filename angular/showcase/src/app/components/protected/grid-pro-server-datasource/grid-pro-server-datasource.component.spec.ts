import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridProServerDatasourceComponent } from './grid-pro-server-datasource.component';

describe('GridProServerDatasourceComponent', () => {
  let component: GridProServerDatasourceComponent;
  let fixture: ComponentFixture<GridProServerDatasourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridProServerDatasourceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridProServerDatasourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
