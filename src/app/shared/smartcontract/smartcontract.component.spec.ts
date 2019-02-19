import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartcontractComponent } from './smartcontract.component';

describe('SmartcontractComponent', () => {
  let component: SmartcontractComponent;
  let fixture: ComponentFixture<SmartcontractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartcontractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartcontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
