import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventProspectComponent } from './event-prospect.component';

describe('EventProspectComponent', () => {
  let component: EventProspectComponent;
  let fixture: ComponentFixture<EventProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventProspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
