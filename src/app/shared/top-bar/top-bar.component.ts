import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { PortfolioService } from '../../shared/services/portfolio-service.service';

@Component({
  selector: 'top-bar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  constructor(public portService:PortfolioService) { }
}
