import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterStockComponent } from './ajouter-stock.component';

describe('AjouterStockComponent', () => {
  let component: AjouterStockComponent;
  let fixture: ComponentFixture<AjouterStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
