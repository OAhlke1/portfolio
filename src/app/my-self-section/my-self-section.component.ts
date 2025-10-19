import { Component } from '@angular/core';
import { PortfolioService } from '../shared/services/portfolio-service.service';
import { NgClass } from '@angular/common';
import { ButtonComponent } from '../shared/buttons/button.component';

@Component({
  selector: 'myself-section',
  standalone: true,
  imports: [NgClass, ButtonComponent],
  templateUrl: './my-self-section.component.html',
  styleUrl: './my-self-section.component.scss'
})
export class MySelfSectionComponent {
  constructor(public portService:PortfolioService) { }
}
