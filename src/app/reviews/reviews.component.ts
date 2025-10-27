import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PortfolioService } from '../shared/services/portfolio-service.service';
import { NgClass, NgStyle } from "../../../node_modules/@angular/common";
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'reviews-section',
  standalone: true,
  imports: [NgClass],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  @ViewChild('sliderOuter') sliderOuter!: any;
  @ViewChild('slider') slider!: any;
  @ViewChildren('slide') slides!: QueryList<ElementRef>;
  slidesArray: HTMLElement[] = [];
  oldActiveSlide!: HTMLElement;
  newActiveSlide!: HTMLElement;
  centerOffset!: number;
  distance!: number;
  widthDifference!: number;
  heightDifference!: number;
  slideWidths: { active: number; unActive: number } = { active: 0, unActive: 0 };
  slideHeights: { active: number; unActive: number } = { active: 0, unActive: 0 };
  sliderOffset: number = 0;
  sliderWidth: number = 0;
  oldActiveSlideIndex: number = 0;
  newActiveSlideIndex: number = 0;
  shiftingPerce: number = 0;
  newActiveSlideOffset: number = 0;
  sliderOffsetOld: number = 0;
  sliderPadding: number = 0;
  animationRuns: boolean = false;
  slidingForward: boolean = true;
  shiftToLeft: boolean = true;
  intervalCode: any = 0;

  constructor(public portService: PortfolioService) { }

  ngAfterViewInit() {
    for (let i = 0; i < this.slides.length; i++) {
      let slide: HTMLElement = this.slides.toArray()[i].nativeElement as HTMLElement;
      this.slidesArray.push(slide);
    }
    this.newActiveSlide = this.slidesArray[0];
    this.newActiveSlide.style.height = '100%';
    this.setNecessaryValues();
  }

  setNecessaryValues() {
    this.sliderOuter = this.sliderOuter.nativeElement as HTMLElement;
    this.slider = this.slider.nativeElement as HTMLElement;
    this.portService.reviews[0].isActive = true;
    this.sliderOffsetOld = this.slider.offsetLeft;
    this.slideHeights.active = this.slidesArray[0].offsetHeight;
    this.slideHeights.unActive = this.slidesArray[1].offsetHeight;
    this.widthDifference = this.slidesArray[0].offsetWidth - this.slidesArray[1].offsetWidth;
    this.heightDifference = this.slidesArray[0].offsetHeight - this.slidesArray[1].offsetHeight;
    this.portService.reviews[this.newActiveSlideIndex].isActive = true;
    this.preshiftSlider();
    this.newActiveSlideOffset = this.newActiveSlide.offsetLeft;
  }

  preshiftSlider() {
    this.slider.style.left = `${(this.sliderOffsetOld + this.sliderOuter.offsetWidth - this.newActiveSlide.offsetWidth) / 2}px`;
  }

  setNewSlideActive(index: number) {
    if (index < 0 || index === this.portService.reviews.length || index === this.newActiveSlideIndex || this.animationRuns) { return; }
    clearInterval(this.intervalCode);
    this.animationRuns = true;
    this.oldActiveSlideIndex = this.newActiveSlideIndex;
    this.oldActiveSlide = this.slidesArray[this.oldActiveSlideIndex];
    this.portService.reviews[this.oldActiveSlideIndex].isActive = false;
    this.newActiveSlideIndex = index;
    this.newActiveSlide = this.slidesArray[this.newActiveSlideIndex];
    this.sliderOffsetOld = this.slider.getBoundingClientRect().left;
    this.shiftToLeft = this.newActiveSlideIndex - this.oldActiveSlideIndex > 0 ? true : false;
    this.distance = (this.sliderOuter.offsetWidth - this.newActiveSlide.offsetWidth) / 2 - this.newActiveSlide.getBoundingClientRect().left + (this.shiftToLeft ? this.widthDifference : -this.widthDifference) / 2;
    this.intervalCode = setInterval(() => { this.shiftSlider(); }, 5);
  }

  shiftSlider() {
    if (this.shiftingPerce >= 100) {
      this.animationRuns = false;
      this.shiftingPerce = 0;
      clearInterval(this.intervalCode);
      this.portService.reviews[this.newActiveSlideIndex].isActive = true;
      this.sliderOffset = this.sliderOffsetOld;
      return;
    }
    this.shiftingPerce += 1;
    this.oldActiveSlide.style.height = `${this.slideHeights.active - this.heightDifference * this.shiftingPerce / 100}px`;
    this.newActiveSlide.style.height = `${this.slideHeights.unActive + this.heightDifference * this.shiftingPerce / 100}px`;
    this.slider.style.left = `${this.sliderOffsetOld + this.shiftingPerce * this.distance / 100}px`;
  }
}