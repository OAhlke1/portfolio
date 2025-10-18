import { Component } from '@angular/core';
import { TopSectionComponent } from '../top-section/top-section.component';
import { MySelfSection } from '../my-self-section/my-self-section.component';
import { FeaturedProjectsComponent } from '../featured-projects/featured-projects.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { Footer } from '../shared/footer/footer.component';
import { WorkTogetherComponent } from '../work-together/work-together.component';
import { PortfolioService } from '../shared/services/portfolio-service.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [TopSectionComponent, MySelfSection, FeaturedProjectsComponent, ReviewsComponent, Footer, WorkTogetherComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  constructor(public portService:PortfolioService) { }
}
