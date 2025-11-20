import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChanson } from './add-chanson';

describe('AddChanson', () => {
  let component: AddChanson;
  let fixture: ComponentFixture<AddChanson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddChanson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChanson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
