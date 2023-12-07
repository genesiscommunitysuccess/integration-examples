import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridProClientDatasourceLinkedComponent } from './grid-pro-client-datasource-linked.component';

describe('GridProClientDatasourceLinkedComponent', () => {
  let component: GridProClientDatasourceLinkedComponent;
  let fixture: ComponentFixture<GridProClientDatasourceLinkedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridProClientDatasourceLinkedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridProClientDatasourceLinkedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
