import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeDetailSummaryComponent } from './practice-detail-summary.component';

describe('PracticeDetailSummaryComponent', () => {
  let component: PracticeDetailSummaryComponent;
  let fixture: ComponentFixture<PracticeDetailSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeDetailSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeDetailSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
