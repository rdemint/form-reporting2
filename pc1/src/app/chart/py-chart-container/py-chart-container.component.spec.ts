import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PyChartContainerComponent } from './py-chart-container.component';

describe('PyChartContainerComponent', () => {
  let component: PyChartContainerComponent;
  let fixture: ComponentFixture<PyChartContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PyChartContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PyChartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
