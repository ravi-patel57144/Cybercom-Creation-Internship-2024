import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbinputComponent } from './nbinput.component';

describe('NbinputComponent', () => {
  let component: NbinputComponent;
  let fixture: ComponentFixture<NbinputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbinputComponent]
    });
    fixture = TestBed.createComponent(NbinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
