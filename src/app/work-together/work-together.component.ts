import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { NgClass } from "../../../node_modules/@angular/common/";
import { PortfolioService } from '../shared/services/portfolio-service.service';
import { ButtonComponent } from "../shared/buttons/button.component";
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'work-together',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './work-together.component.html',
  styleUrl: './work-together.component.scss'
})
export class WorkTogetherComponent {
  @ViewChild('submitButton') submitButton!: ElementRef;
  @ViewChild('yourNameInput') yourNameInput!: ElementRef;
  @ViewChild('yourNameHintE') yourNameHintE!: ElementRef;
  @ViewChild('yourNameHintG') yourNameHintG!: ElementRef;
  @ViewChild('yourMailInput') yourMailInput!: ElementRef;
  @ViewChild('yourMailHintE') yourMailHintE!: ElementRef;
  @ViewChild('yourMailHintG') yourMailHintG!: ElementRef;
  @ViewChild('yourMessageInput') yourMessageInput!: ElementRef;
  @ViewChild('yourMessageHintE') yourMessageHintE!: ElementRef;
  @ViewChild('yourMessageHintG') yourMessageHintG!: ElementRef;
  @ViewChild('checkerLabelE') checkerLabelE!: ElementRef;
  @ViewChild('checkerLabelG') checkerLabelG!: ElementRef;
  @ViewChild('checkerInput') checker!: ElementRef;
  http = inject(HttpClient);
  contactData = {
    name: "",
    email: "",
    message: "",
    receivingMail: ""
  }
  correctlyFilled: boolean = false;
  mailSentSuccessfully: boolean = false;
  sentAdviceShown: boolean = false;
  namePatternCorrect: any = "false";
  mailPatternCorrect: any = "false";
  checkerChecked: any = false;
  formFocused: any = false;
  mailRegEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
  messageInputcontainsText: boolean = true;

  constructor(public portService: PortfolioService, public router: Router) { }

  post = {
    endPoint: 'https://oscar-ahlke.de/angular/portfolio/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (!this.correctlyFilled) {
      return;
    } else {
      this.correctlyFilled = false;
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
            this.mailSentSuccessfully = false;
            this.showSentAdvice();
          },
          complete: () => {
            this.resetForm();
            this.mailSentSuccessfully = true;
            this.showSentAdvice();
          }
        });
    }
  }

  focusYourNameInput() {
    this.yourNameInput.nativeElement.focus();
  }
  
  filledOutCorrectly(event: any = null) {
    if(!this.formFocused) { this.formFocused = !this.formFocused; }
    console.log(this.checkerChecked, this.formFocused);
    this.checkName(event);
    this.checkMail(event);
    this.checkMessage(event);
    // this.checkerChecking();
  }

  checkName(event: any = null) {
    if(event.key && this.yourNameInput.nativeElement.value === "" && event.key === "Tab") { return; }
    if (this.yourNameInput.nativeElement.value.length <= 2) {
      this.namePatternCorrect = false;
    }  else { this.namePatternCorrect = true; }
    this.enableDisableButton();
  }

  checkMail(event: any = null) {
    if(event.key && this.yourMailInput.nativeElement.value === "" && event.key === "Tab") { return; }
    if (!this.mailRegEx.test(this.yourMailInput.nativeElement.value)) {
      this.mailPatternCorrect = false;
    } else { this.mailPatternCorrect = true; }
    this.enableDisableButton();
  }

  checkMessage(event: any = null) {
    if(event.key && this.yourMailInput.nativeElement.value === "" && event.key === "Tab") { return; }
    if (this.yourMessageInput.nativeElement.value === "") {
      this.messageInputcontainsText = false;
    } else { this.messageInputcontainsText = true; }
    this.enableDisableButton();
  }

  checkerChecking() {
    if (this.checkerChecked === "0" || !this.checkerChecked) {
      this.checkerChecked = true;
    }
  }

  enableDisableButton() {
    if(this.namePatternCorrect && this.mailPatternCorrect && this.messageInputcontainsText && this.checkerChecked) {
      this.submitButton.nativeElement.removeAttribute('disabled');
      this.correctlyFilled = true;
    }else {
      this.correctlyFilled = false;
      this.submitButton.nativeElement.setAttribute('disabled', true);
    }
  }

  resetForm() {
    this.yourNameInput.nativeElement.value = "";
    this.yourMailInput.nativeElement.value = "";
    this.yourMessageInput.nativeElement.value = "";
  }

  showSentAdvice() {
    this.sentAdviceShown = true;
    setTimeout(() => { this.sentAdviceShown = false; }, 3000);
  }
}
