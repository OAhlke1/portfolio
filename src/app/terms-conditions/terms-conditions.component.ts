import { Component } from '@angular/core';
import { TopBarComponent } from '../shared/top-bar/top-bar.component';
import { PortfolioService } from '../shared/services/portfolio-service.service';
import { NgClass } from "@angular/common";
import { Router } from '@angular/router';
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [TopBarComponent, NgClass, FooterComponent],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.scss'
})
export class TermsConditionsComponent {
  constructor(public portService:PortfolioService, public routes:Router) { }

  ngOnInit() {
    this.setLang();
    this.portService.burgerMenuShiftedIn = false;
    this.portService.burgerMenuShiftedOut = false;
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