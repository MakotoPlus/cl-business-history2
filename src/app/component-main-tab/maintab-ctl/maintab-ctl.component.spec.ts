import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintabCtlComponent } from './maintab-ctl.component';

describe('MaintabCtlComponent', () => {
  let component: MaintabCtlComponent;
  let fixture: ComponentFixture<MaintabCtlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintabCtlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintabCtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
