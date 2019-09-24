import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashSelectorComponent } from './dash-selector.component';

describe('DashSelectorComponent', () => {
  let component: DashSelectorComponent;
  let fixture: ComponentFixture<DashSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
