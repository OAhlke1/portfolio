import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { PortfolioService } from '../shared/services/portfolio-service.service';
import { TopBarComponent } from "../shared/top-bar/top-bar.component";
import { ButtonComponent } from '../shared/buttons/button.component';
import { RunningBannerComponent } from './running-banner/running-banner.component';
import { IconButtonComponent } from "../shared/buttons/icon-button/icon-button.component";

@Component({
  selector: 'top-section',
  standalone: true,
  imports: [NgClass, ButtonComponent, RunningBannerComponent, IconButtonComponent, TopBarComponent],
  templateUrl: './top-section.component.html',
  styleUrl: './top-section.component.scss'
})
export class TopSectionComponent {
  englishActivated:boolean = true;
  germanActivated:boolean = false;

  constructor(public portService:PortfolioService) { }

  switchLanguage() {
    if(this.englishActivated) {
      this.englishActivated = false;
      this.germanActivated = true;
    }else if(this.germanActivated) {
      this.englishActivated = true;
      this.germanActivated = false;
    }
  }
}
