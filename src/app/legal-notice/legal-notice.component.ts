import { Component } from '@angular/core';
import { TopBarComponent } from '../shared/top-bar/top-bar.component';
import { PortfolioService } from '../shared/services/portfolio-service.service';
import { NgClass } from "../../../node_modules/@angular/common/";
import { Router } from '@angular/router';
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [TopBarComponent, NgClass, FooterComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {
  constructor(public portService:PortfolioService, public routes:Router) { }

  ngOnInit() {
    this.setLang();
    this.portService.burgerMenuShiftedIn = false;
    this.portService.burgerMenuShiftedOut = true;
  }

  setLang() {
    if(localStorage.getItem('lang') === "eng") {
      this.portService.englishActivated = true;
      this.portService.germanActivated = false;
    }else  {
      this.portService.englishActivated = false;
      this.portService.germanActivated = true;
    }
  }
}