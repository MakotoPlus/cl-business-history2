import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfoModalComponent } from './userinfo-modal.component';

describe('UserinfoModalComponent', () => {
  let component: UserinfoModalComponent;
  let fixture: ComponentFixture<UserinfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserinfoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
