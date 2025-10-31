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

  openLightBox(index: number, nextClicked: boolean) {
    if(this.overlayJustOpened) {
      this.overlayJustOpened = false;
      this.project = this.portService.projects[index];
      this.overlayShown = true;
    }else if (index === 0 && !nextClicked) {
      return;
    } else if (index + 1 === this.portService.projects.length && nextClicked) {
      return;
    } else if(!nextClicked) {
      this.project = this.portService.projects[index-1];
      this.overlayShown = true;
    } else if (nextClicked) {
      this.project = this.portService.projects[index+1];
      this.overlayShown = true;
    }
  }

  closeLightBox() {
    this.overlayShown=false;
    this.overlayJustOpened=true;
  }
}
