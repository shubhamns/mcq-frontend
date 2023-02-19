import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenEndedComponent } from './open-ended.component';

describe('OpenEndedComponent', () => {
  let component: OpenEndedComponent;
  let fixture: ComponentFixture<OpenEndedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenEndedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenEndedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
