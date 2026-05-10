import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLightboxComponent } from './project-lightbox.component';

describe('ProjectLightboxComponent', () => {
  let component: ProjectLightboxComponent;
  let fixture: ComponentFixture<ProjectLightboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectLightboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectLightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});