import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutShowcaseComponent } from './layout-showcase.component';

describe('LayoutShowcaseComponent', () => {
  let component: LayoutShowcaseComponent;
  let fixture: ComponentFixture<LayoutShowcaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutShowcaseComponent]
    });
    fixture = TestBed.createComponent(LayoutShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
