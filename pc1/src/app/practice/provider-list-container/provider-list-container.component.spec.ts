import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderListContainerComponent } from './provider-list-container.component';

describe('ProviderListContainerComponent', () => {
  let component: ProviderListContainerComponent;
  let fixture: ComponentFixture<ProviderListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
