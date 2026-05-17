import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PrivacyComponent } from "./privacy/privacy.component";
import { PortfolioService } from './shared/services/portfolio-service.service';
import { ProjectLightboxComponent } from "./project-lightbox/project-lightbox.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProjectLightboxComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
  constructor(public portService: PortfolioService) { }
}