import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartJsContainerComponent } from './chart-js-container.component';

describe('ChartJsContainerComponent', () => {
  let component: ChartJsContainerComponent;
  let fixture: ComponentFixture<ChartJsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartJsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartJsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
