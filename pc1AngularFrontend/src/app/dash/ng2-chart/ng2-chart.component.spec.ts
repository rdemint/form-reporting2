import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2ChartComponent } from './ng2-chart.component';

describe('Ng2ChartComponent', () => {
  let component: Ng2ChartComponent;
  let fixture: ComponentFixture<Ng2ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2ChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
