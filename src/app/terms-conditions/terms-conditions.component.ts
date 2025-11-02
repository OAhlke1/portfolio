import { Component } from '@angular/core';
import { TopBarComponent } from '../shared/top-bar/top-bar.component';
import { PortfolioService } from '../shared/services/portfolio-service.service';
import { NgClass } from "@angular/common";
import { Router } from '@angular/router';
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-disclaimer',
  standalone: true,
  imports: [TopBarComponent, NgClass, FooterComponent],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.scss'
})
export class TermsConditionsComponent {
  constructor(public portService:PortfolioService, public routes:Router) { }

  ngOnInit() {
    this.portService.burgerMenuShiftedIn = false;
    this.portService.burgerMenuShiftedOut = false;
    console.log(this.portService.burgerMenuShiftedIn, this.portService.burgerMenuShiftedOut);
  }
}