import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeOutletComponent } from './practice-outlet.component';

describe('PracticeOutletComponent', () => {
  let component: PracticeOutletComponent;
  let fixture: ComponentFixture<PracticeOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
