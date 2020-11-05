import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIssuesComponent } from './admin-issues.component';

describe('AdminIssuesComponent', () => {
  let component: AdminIssuesComponent;
  let fixture: ComponentFixture<AdminIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
