import { Component } from '@angular/core';
import * as AOS from 'aos';
import { TopSectionComponent } from '../top-section/top-section.component';
import { MySelfSectionComponent } from '../my-self-section/my-self-section.component';
import { FeaturedProjectsComponent } from '../featured-projects/featured-projects.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { WorkTogetherComponent } from '../work-together/work-together.component';
import { PortfolioService } from '../shared/services/portfolio-service.service';
import { ProjectLightboxComponent } from '../project-lightbox/project-lightbox.component';
import { NgClass } from "../../../node_modules/@angular/common";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [TopSectionComponent, MySelfSectionComponent, FeaturedProjectsComponent, ReviewsComponent, FooterComponent, WorkTogetherComponent, ProjectLightboxComponent, NgClass],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  constructor(public portService: PortfolioService) { }

  ngOnInit() {
    if(localStorage.getItem('lang') === "eng") {
      this.portService.englishActivated = true;
      this.portService.germanActivated = false;
    }else  {
      this.portService.englishActivated = false;
      this.portService.germanActivated = true;
    }
    AOS.init();
  }

  ngAfterViewInit(): void {
    AOS.init();
    AOS.refresh();
  }
}
