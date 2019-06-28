import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDetailContainerComponent } from './provider-detail-container.component';

describe('ProviderDetailContainerComponent', () => {
  let component: ProviderDetailContainerComponent;
  let fixture: ComponentFixture<ProviderDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDetailContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
