import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenBoxComponent } from './green-box.component';

describe('GreenBoxComponent', () => {
  let component: GreenBoxComponent;
  let fixture: ComponentFixture<GreenBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreenBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GreenBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
