import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeDetailProviderComponent } from './practice-detail-provider.component';

describe('PracticeDetailProviderComponent', () => {
  let component: PracticeDetailProviderComponent;
  let fixture: ComponentFixture<PracticeDetailProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeDetailProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeDetailProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
