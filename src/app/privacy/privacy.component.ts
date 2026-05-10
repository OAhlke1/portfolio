import { Component, OnInit } from '@angular/core';
import { TopBarComponent } from '../shared/top-bar/top-bar.component';
import { PortfolioService } from '../shared/services/portfolio-service.service';
import { NgClass } from "../../../node_modules/@angular/common/";
import { Router } from '@angular/router';
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [TopBarComponent, NgClass, FooterComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {
  constructor(public portService:PortfolioService) { }

  ngOnInit() :void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    this.portService.burgerMenuShiftedOut = "null";
    this.portService.burgerMenuShiftedIn = "null";
    this.setLang();
  }

  setLang() {
    console.log(localStorage.getItem('lang'));
    if(localStorage.getItem('lang') === "eng") {
      this.portService.englishActivated = true;
      this.portService.germanActivated = false;
    }if(localStorage.getItem('lang') === "ger") {
      this.portService.englishActivated = false;
      this.portService.germanActivated = true;
    }
  }
}