import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterProspectComponent } from './ajouter-prospect.component';

describe('AjouterProspectComponent', () => {
  let component: AjouterProspectComponent;
  let fixture: ComponentFixture<AjouterProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterProspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
