import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTogether } from './work-together.component';

describe('WorkTogether', () => {
  let component: WorkTogether;
  let fixture: ComponentFixture<WorkTogether>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkTogether]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkTogether);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
