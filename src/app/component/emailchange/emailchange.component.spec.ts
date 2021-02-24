import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailchangeComponent } from './emailchange.component';

describe('EmailchangeComponent', () => {
  let component: EmailchangeComponent;
  let fixture: ComponentFixture<EmailchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
