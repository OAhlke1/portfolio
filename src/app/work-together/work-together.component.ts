import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgClass } from "../../../node_modules/@angular/common/";
import { PortfolioService } from '../shared/services/portfolio-service.service';
import { ButtonComponent } from "../shared/buttons/button.component";

@Component({
  selector: 'work-together',
  standalone: true,
  imports: [NgClass, ButtonComponent],
  templateUrl: './work-together.component.html',
  styleUrl: './work-together.component.scss'
})
export class WorkTogether {
  @ViewChild('submitButton') submitButton!:ElementRef;
  constructor(public portService:PortfolioService) { }

  clickButton(event:Event) {
    this.submitButton.nativeElement.click();
  }

  submitFunction(event:Event) {
    event.preventDefault();
  }
}
