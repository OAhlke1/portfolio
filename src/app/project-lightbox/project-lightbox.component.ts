import { Component, ElementRef, ViewChild } from '@angular/core';
import { PortfolioService } from '../shared/services/portfolio-service.service';
import { NgClass, NgStyle } from "../../../node_modules/@angular/common";
import { ProjectsInterface } from '../shared/interfaces/projects.interface';
import { ButtonComponent } from "../shared/buttons/button.component";

@Component({
  selector: 'project-lightbox',
  standalone: true,
  imports: [NgClass, ButtonComponent, NgStyle],
  templateUrl: './project-lightbox.component.html',
  styleUrl: './project-lightbox.component.scss'
})
export class ProjectLightboxComponent {
  overlayShown: boolean = false;
  project!: ProjectsInterface;
  hidePrevProject: boolean = false;
  hideNextProject: boolean = false;
  @ViewChild('projectsLightboxLeft') projectsLightboxLeft!: ElementRef;

  constructor(public portService: PortfolioService) { }

  ngAfterViewInit() {
    console.log(this.projectsLightboxLeft);
    this.portService.projectsLightboxLeft = this.projectsLightboxLeft;
  }
}
