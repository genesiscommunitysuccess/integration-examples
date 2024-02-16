import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReportingComponent } from './reporting.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ReportingComponent', () => {
  let component: ReportingComponent;
  let fixture: ComponentFixture<ReportingComponent>;
  let pushStateSpy: jasmine.Spy;

  beforeEach(async () => {
    // Spy on history.pushState
    pushStateSpy = spyOn(window.history, 'pushState');

    await TestBed.configureTestingModule({
      imports: [ReportingComponent], // Import the standalone component
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set ready to true after view initialization', () => {
    expect(component.ready).toBe(false);
    component.ngAfterViewInit();
    expect(component.ready).toBe(true);
  });

  it('should push correct states to history after view initialization', fakeAsync(() => {
    component.ngAfterViewInit();

    // Initial pushState call
    expect(pushStateSpy.calls.first().args).toEqual([null, '', '/']);

    // Simulate the passage of time
    tick(1000);

    // Second pushState call after timeout
    expect(pushStateSpy.calls.mostRecent().args).toEqual([null, '', '/reporting']);
  }));
});
