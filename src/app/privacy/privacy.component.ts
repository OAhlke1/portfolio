import { Component } from '@angular/core';
import { TopBarComponent } from '../shared/top-bar/top-bar.component';
import { PortfolioService } from '../shared/services/portfolio-service.service';
import { NgClass } from "../../../node_modules/@angular/common/";
import { Router } from '@angular/router';
import { Footer } from "../shared/footer/footer.component";

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [TopBarComponent, NgClass, Footer],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {
  constructor(public portService:PortfolioService, public routes:Router) { }
}