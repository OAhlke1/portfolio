import { Component, ElementRef, ViewChild } from '@angular/core';
import { PortfolioService } from '../../shared/services/portfolio-service.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'running-banner',
  standalone: true,
  imports: [NgClass],
  templateUrl: './running-banner.component.html',
  styleUrl: './running-banner.component.scss'
})
export class RunningBannerComponent {
  @ViewChild('firstHalf') firstBannerHalf!: ElementRef;
  @ViewChild('secondHalf') secondBannerHalf!: ElementRef;
  bannerKeywords: { eng: string, ger: string }[] = [{ eng: 'Available for remote work', ger: 'Homeoffice möglich' }];
  bannerAnimationCode!: any;
  animationPercentage: number = 0;
  hovering: boolean = false;

  constructor(public portService: PortfolioService) { }

  ngOnInit() {
    for (let i = 0; i < 3; i++) {
      this.bannerKeywords.push({ eng: 'Available for remote work', ger: 'Homeoffice möglich' });
      this.bannerKeywords.push({ eng: 'I can code', ger: 'Ich kann programmieren' });
      this.bannerKeywords.push({ eng: 'Available for remote work', ger: 'Homeoffice möglich' });
      this.bannerKeywords.push({ eng: 'I can code', ger: 'Ich kann programmieren' });
    }
  }

  ngAfterViewInit() {
    this.bannerAnimationCode = setInterval(() => { this.runBannerAnimation() }, 20);
  }

  runBannerAnimation() {
    if (!this.hovering) {
      this.firstBannerHalf.nativeElement.style.transform = `translateX(${this.animationPercentage - 50}%)`;
      this.secondBannerHalf.nativeElement.style.transform = `translateX(${this.animationPercentage - 50}%)`;
      this.animationPercentage += 0.06;
      if (this.animationPercentage > 100) { this.animationPercentage = 0; }
    }
  }
}