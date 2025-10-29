import { Component, ElementRef, QueryList, ViewChild, ViewChildren, HostListener } from '@angular/core';
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
  @ViewChild('sliderOuter', { static: false }) sliderOuter!: any;
  @ViewChild('slider', { static: false }) slider!: any;
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
  activeSlideIndex: number = 0;
  shiftingPerce: number = 0;
  newActiveSlideOffset: number = 0;
  sliderOffsetOld: number = 0;
  sliderPadding: number = 0;
  animationRuns: boolean = false;
  slidingForward: boolean = true;
  shiftToLeft: boolean = true;
  intervalCode: any = 0;
  sliderOuterWidth: number = 0;

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

  @HostListener('window:orientationchange', ['$event'])
  onResize(event: Event) {
    setTimeout(() => {
      this.refillSlidesArray()
      /* switch (window.orientation) {
        case 0:
          this.rotateToNormalScreen();
          break;
        case 90:
          this.rotateToWideScreen();
          break;
      } */
      this.rotatingScreen();
    }, 10);
  }

  refillSlidesArray() {
    this.slidesArray = [];
    for (let i = 0; i < this.slides.length; i++) {
      let slide: HTMLElement = this.slides.toArray()[i].nativeElement as HTMLElement;
      this.slidesArray.push(slide);
    }
  }
  
  rotatingScreen() {
    let slideWidth: number;
    if (this.activeSlideIndex === 0) {
      slideWidth = this.slidesArray[1].offsetWidth;
    } else if (this.activeSlideIndex === this.slidesArray.length - 1) {
      slideWidth = this.slidesArray[0].offsetWidth;
    } else { slideWidth = this.slidesArray[this.activeSlideIndex - 1].offsetWidth; }
    let slideActiveWidth = this.slidesArray[this.activeSlideIndex].offsetWidth;
    let gap = window.innerWidth > 650 ? 40 : 8;
    let rotOffset = this.sliderOuter.offsetWidth / 2 - (this.activeSlideIndex * (gap + slideWidth) + slideActiveWidth / 2);
    this.slider.style.left = `${rotOffset}px`;
  }

  rotateToNormalScreen() {
    let slideWidth: number;
    if (this.activeSlideIndex === 0) {
      slideWidth = this.slidesArray[1].offsetWidth;
    } else if (this.activeSlideIndex === this.slidesArray.length - 1) {
      slideWidth = this.slidesArray[0].offsetWidth;
    } else { slideWidth = this.slidesArray[this.activeSlideIndex - 1].offsetWidth; }
    let slideActiveWidth = this.slidesArray[this.activeSlideIndex].offsetWidth;
    let gap = window.innerWidth > 650 ? 40 : 8;
    let rotOffset = this.sliderOuter.offsetWidth / 2 - (this.activeSlideIndex * (gap + slideWidth) + slideActiveWidth / 2);
    this.slider.style.left = `${rotOffset}px`;
  }

  rotateToWideScreen() {
    let slideWidth: number;
    if (this.activeSlideIndex === 0) {
      slideWidth = this.slidesArray[1].offsetWidth;
    } else if (this.activeSlideIndex === this.slidesArray.length - 1) {
      slideWidth = this.slidesArray[0].offsetWidth;
    } else { slideWidth = this.slidesArray[this.activeSlideIndex - 1].offsetWidth; }
    let slideActiveWidth = this.slidesArray[this.activeSlideIndex].offsetWidth;
    let gap = window.innerWidth > 650 ? 40 : 8;
    let rotOffset = this.sliderOuter.offsetWidth / 2 - (this.activeSlideIndex * (gap + slideWidth) + slideActiveWidth / 2);
    this.slider.style.left = `${rotOffset}px`;
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
    this.portService.reviews[this.activeSlideIndex].isActive = true;
    this.preshiftSlider();
    this.newActiveSlideOffset = this.newActiveSlide.offsetLeft;
  }

  preshiftSlider() {
    this.slider.style.left = `${(this.sliderOffsetOld + this.sliderOuter.offsetWidth - this.newActiveSlide.offsetWidth) / 2}px`;
  }

  setNewSlideActive(index: number) {
    if (index < 0 || index === this.portService.reviews.length || index === this.activeSlideIndex || this.animationRuns) { return; }
    this.animationRuns = true;
    this.oldActiveSlideIndex = this.activeSlideIndex;
    this.oldActiveSlide = this.slidesArray[this.oldActiveSlideIndex];
    this.portService.reviews[this.oldActiveSlideIndex].isActive = false;
    this.activeSlideIndex = index;
    this.newActiveSlide = this.slidesArray[this.activeSlideIndex];
    this.sliderOffsetOld = this.slider.getBoundingClientRect().left;
    this.shiftToLeft = this.activeSlideIndex - this.oldActiveSlideIndex > 0 ? true : false;
    this.distance = (this.sliderOuter.offsetWidth - this.newActiveSlide.offsetWidth) / 2 - this.newActiveSlide.getBoundingClientRect().left + (this.shiftToLeft ? this.widthDifference : -this.widthDifference) / 2;
    this.intervalCode = setInterval(() => { this.shiftSlider(); }, 5);
  }

  shiftSlider() {
    if (this.shiftingPerce >= 100) {
      this.animationRuns = false;
      this.shiftingPerce = 0;
      clearInterval(this.intervalCode);
      this.portService.reviews[this.activeSlideIndex].isActive = true;
      this.sliderOffset = this.sliderOffsetOld;
      return;
    }
    this.shiftingPerce += 1;
    this.oldActiveSlide.style.height = `${this.slideHeights.active - this.heightDifference * this.shiftingPerce / 100}px`;
    this.newActiveSlide.style.height = `${this.slideHeights.unActive + this.heightDifference * this.shiftingPerce / 100}px`;
    this.slider.style.left = `${this.sliderOffsetOld + this.shiftingPerce * this.distance / 100}px`;
  }
}