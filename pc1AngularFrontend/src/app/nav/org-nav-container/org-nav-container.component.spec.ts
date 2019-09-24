import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgNavContainerComponent } from './org-nav-container.component';

describe('OrgNavContainerComponent', () => {
  let component: OrgNavContainerComponent;
  let fixture: ComponentFixture<OrgNavContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgNavContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgNavContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
