import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExporttoexcelComponent } from './exporttoexcel.component';

describe('ExporttoexcelComponent', () => {
  let component: ExporttoexcelComponent;
  let fixture: ComponentFixture<ExporttoexcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExporttoexcelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExporttoexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
