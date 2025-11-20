import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chansons } from './chansons';

describe('Chansons', () => {
  let component: Chansons;
  let fixture: ComponentFixture<Chansons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chansons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chansons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
