import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinmodalComponent } from './coinmodal.component';

describe('CoinmodalComponent', () => {
  let component: CoinmodalComponent;
  let fixture: ComponentFixture<CoinmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
