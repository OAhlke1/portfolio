import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySelfSectionComponent } from './my-self-section.component';

describe('MySelfSectionComponent', () => {
  let component: MySelfSectionComponent;
  let fixture: ComponentFixture<MySelfSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySelfSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MySelfSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
