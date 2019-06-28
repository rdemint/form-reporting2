import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProviderContainerComponent } from './add-provider-container.component';

describe('AddProviderContainerComponent', () => {
  let component: AddProviderContainerComponent;
  let fixture: ComponentFixture<AddProviderContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProviderContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProviderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
