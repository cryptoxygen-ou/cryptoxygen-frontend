import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErcComponent } from './erc.component';

describe('ErcComponent', () => {
  let component: ErcComponent;
  let fixture: ComponentFixture<ErcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
