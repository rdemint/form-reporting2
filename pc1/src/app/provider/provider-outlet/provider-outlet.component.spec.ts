import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderOutletComponent } from './provider-outlet.component';

describe('ProviderOutletComponent', () => {
  let component: ProviderOutletComponent;
  let fixture: ComponentFixture<ProviderOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
