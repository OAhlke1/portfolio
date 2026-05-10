import { Component, ElementRef } from '@angular/core';
import { PortfolioService } from '../shared/services/portfolio-service.service';
import { NgClass, NgStyle } from "../../../node_modules/@angular/common";
import { ProjectsInterface } from '../shared/interfaces/projects.interface';
import { ButtonComponent } from "../shared/buttons/button.component";

@Component({
  selector: 'featured-projects',
  standalone: true,
  imports: [NgClass, ButtonComponent, NgStyle],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.scss'
})
export class FeaturedProjectsComponent {
  overlayShown: boolean = false;
  project!: ProjectsInterface;
  hidePrevProject: boolean = false;
  hideNextProject: boolean = false;
  overlayJustOpened: boolean = true;

  constructor(public portService: PortfolioService) { }

  showHideSidePic(index: number) {
    this.hideAllSidePics();
    if (this.portService.projects[index].sideImageShown) {
      this.portService.projects[index].sideImageShown = false;
    } else if (!this.portService.projects[index].sideImageShown) {
      this.portService.projects[index].sideImageShown = true;
    }
  }

  hideAllSidePics() {
    for(let project of this.portService.projects) {
      project.sideImageShown = false;
    }
  }
}
