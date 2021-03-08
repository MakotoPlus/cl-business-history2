import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfoConfirmComponent } from './userinfo-confirm.component';

describe('UserinfoConfirmComponent', () => {
  let component: UserinfoConfirmComponent;
  let fixture: ComponentFixture<UserinfoConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserinfoConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinfoConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
