import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeDetailSpecialtiesListComponent } from './practice-detail-specialties-list.component';

describe('PracticeDetailSpecialtiesListComponent', () => {
  let component: PracticeDetailSpecialtiesListComponent;
  let fixture: ComponentFixture<PracticeDetailSpecialtiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeDetailSpecialtiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeDetailSpecialtiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
