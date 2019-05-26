import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeDetailProvidersListComponent } from './practice-detail-providers-list.component';

describe('PracticeDetailProvidersListComponent', () => {
  let component: PracticeDetailProvidersListComponent;
  let fixture: ComponentFixture<PracticeDetailProvidersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeDetailProvidersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeDetailProvidersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
