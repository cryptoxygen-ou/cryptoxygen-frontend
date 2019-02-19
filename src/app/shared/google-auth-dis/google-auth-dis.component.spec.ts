import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthDisComponent } from './google-auth-dis.component';

describe('GoogleAuthDisComponent', () => {
  let component: GoogleAuthDisComponent;
  let fixture: ComponentFixture<GoogleAuthDisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleAuthDisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAuthDisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
