import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { TopSectionComponent } from "./top-section/top-section.component";
import { PortfolioService } from './shared/services/portfolio-service.service';
import { MySelfSection } from './my-self-section/my-self-section.component';
import { FeaturedProjectsComponent } from "./featured-projects/featured-projects.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { Footer } from './shared/footer/footer.component';
import { WorkTogether } from "./work-together/work-together.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopSectionComponent, MySelfSection, FeaturedProjectsComponent, ReviewsComponent, Footer, WorkTogether],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';

  constructor(public portService:PortfolioService) { }
}
