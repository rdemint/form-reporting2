import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderFormContainerComponent } from './provider-form-container.component';

describe('ProviderFormContainerComponent', () => {
  let component: ProviderFormContainerComponent;
  let fixture: ComponentFixture<ProviderFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
