import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProspectComponent } from './table-prospect.component';

describe('TableProspectComponent', () => {
  let component: TableProspectComponent;
  let fixture: ComponentFixture<TableProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableProspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
