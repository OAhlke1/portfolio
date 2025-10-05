import { Component, ElementRef } from '@angular/core';
import { PortfolioService } from '../shared/services/portfolio-service.service';
import { NgClass } from "../../../node_modules/@angular/common";
import { ProjectsInterface } from '../shared/interfaces/projects.interface';
import { ButtonComponent } from "../shared/buttons/button.component";

@Component({
  selector: 'featured-projects',
  standalone: true,
  imports: [NgClass, ButtonComponent],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.scss'
})
export class FeaturedProjectsComponent {
  overlayShown:boolean = false;
  project!:ProjectsInterface;
  hidePrevProject:boolean = false;
  hideNextProject:boolean = false;
  
  constructor(public portService:PortfolioService) { }

  openLightBox(index:number) {
    this.project = this.portService.projects[index];
    this.overlayShown = true;
  }
}
