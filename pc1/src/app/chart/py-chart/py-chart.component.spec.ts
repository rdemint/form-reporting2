import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PyChartComponent } from './py-chart.component';

describe('PyChartComponent', () => {
  let component: PyChartComponent;
  let fixture: ComponentFixture<PyChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PyChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
