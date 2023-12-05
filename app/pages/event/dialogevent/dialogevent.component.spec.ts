import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogeventComponent } from './dialogevent.component';

describe('DialogeventComponent', () => {
  let component: DialogeventComponent;
  let fixture: ComponentFixture<DialogeventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogeventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
