import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildevisComponent } from './detaildevis.component';

describe('DetaildevisComponent', () => {
  let component: DetaildevisComponent;
  let fixture: ComponentFixture<DetaildevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaildevisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaildevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
