import { Component } from '@angular/core';
import { NgClass } from "../../../../node_modules/@angular/common/";
import { PortfolioService } from '../services/portfolio-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgClass],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public portService:PortfolioService, public routes:Router) { }
}
