import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricetimerComponent } from './pricetimer.component';

describe('PricetimerComponent', () => {
  let component: PricetimerComponent;
  let fixture: ComponentFixture<PricetimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricetimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricetimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
