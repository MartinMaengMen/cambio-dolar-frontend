import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDivisaComponent } from './change-divisa.component';

describe('ChangeDivisaComponent', () => {
  let component: ChangeDivisaComponent;
  let fixture: ComponentFixture<ChangeDivisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeDivisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeDivisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
