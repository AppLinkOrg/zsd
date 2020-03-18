import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShibieComponent } from './shibie.component';

describe('ShibieComponent', () => {
  let component: ShibieComponent;
  let fixture: ComponentFixture<ShibieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShibieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShibieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
