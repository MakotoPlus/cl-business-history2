import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfoDeleteComponent } from './userinfo-delete.component';

describe('UserinfoDeleteComponent', () => {
  let component: UserinfoDeleteComponent;
  let fixture: ComponentFixture<UserinfoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserinfoDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinfoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
