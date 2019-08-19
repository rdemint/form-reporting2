import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2ChartContainerComponent } from './ng2-chart-container.component';

describe('Ng2ChartContainerComponent', () => {
  let component: Ng2ChartContainerComponent;
  let fixture: ComponentFixture<Ng2ChartContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2ChartContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2ChartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
