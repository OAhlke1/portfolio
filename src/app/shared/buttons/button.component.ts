import { Component, Input } from '@angular/core';
import { PortfolioService } from '../../shared/services/portfolio-service.service';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() englishText!:string;
  @Input() germanText!:string;
  @Input() sign!:string;
  @Input() url!:string;
  @Input() iconSrc!:string;
  @Input() buttonStyles!: {};

  constructor(public portService:PortfolioService) { }
  
  ngOnInit() { }
}
