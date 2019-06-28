import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderManagerContainerComponent } from './provider-manager-container.component';

describe('ProviderManagerContainerComponent', () => {
  let component: ProviderManagerContainerComponent;
  let fixture: ComponentFixture<ProviderManagerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderManagerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderManagerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
