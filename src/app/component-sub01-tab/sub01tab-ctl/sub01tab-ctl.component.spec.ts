import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sub01tabCtlComponent } from './sub01tab-ctl.component';

describe('Sub01tabCtlComponent', () => {
  let component: Sub01tabCtlComponent;
  let fixture: ComponentFixture<Sub01tabCtlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sub01tabCtlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sub01tabCtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
