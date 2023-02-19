import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCQSComponent } from './mcqs.component';

describe('MCQSComponent', () => {
  let component: MCQSComponent;
  let fixture: ComponentFixture<MCQSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MCQSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MCQSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
