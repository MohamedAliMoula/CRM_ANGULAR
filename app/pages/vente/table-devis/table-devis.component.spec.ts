import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDevisComponent } from './table-devis.component';

describe('TableDevisComponent', () => {
  let component: TableDevisComponent;
  let fixture: ComponentFixture<TableDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDevisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
