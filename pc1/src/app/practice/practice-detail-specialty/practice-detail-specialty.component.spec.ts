import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeDetailSpecialtyComponent } from './practice-detail-specialty.component';

describe('PracticeDetailSpecialtyComponent', () => {
  let component: PracticeDetailSpecialtyComponent;
  let fixture: ComponentFixture<PracticeDetailSpecialtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeDetailSpecialtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeDetailSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
