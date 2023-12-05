import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifDevisComponent } from './modif-devis.component';

describe('ModifDevisComponent', () => {
  let component: ModifDevisComponent;
  let fixture: ComponentFixture<ModifDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifDevisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
