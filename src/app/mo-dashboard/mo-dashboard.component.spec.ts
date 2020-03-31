import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoDashboardComponent } from './mo-dashboard.component';

describe('MoDashboardComponent', () => {
  let component: MoDashboardComponent;
  let fixture: ComponentFixture<MoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
