import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProspectComponent } from './dialog-prospect.component';

describe('DialogProspectComponent', () => {
  let component: DialogProspectComponent;
  let fixture: ComponentFixture<DialogProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
