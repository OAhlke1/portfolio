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
  @ViewChild('yourNameLabelE') yourNameLabelE!: ElementRef;
  @ViewChild('yourNameLabelG') yourNameLabelG!: ElementRef;
  @ViewChild('yourMailInput') yourMailInput!: ElementRef;
  @ViewChild('yourMailLabelE') yourMailLabelE!: ElementRef;
  @ViewChild('yourMailLabelG') yourMailLabelG!: ElementRef;
  @ViewChild('yourMessageInput') yourMessageInput!: ElementRef;
  @ViewChild('yourMessageLabelE') yourMessageLabelE!: ElementRef;
  @ViewChild('yourMessageLabelG') yourMessageLabelG!: ElementRef;
  @ViewChild('checker') checker!: ElementRef;
  http = inject(HttpClient);
  contactData = {
    name: "",
    email: "",
    message: "",
    receivingMail: ""
  }
  correctlyFilled!: boolean;
  mailSentSuccessfully: boolean = false;
  sentAdviceShown: boolean = false;
  namePatternCorrect: any = "false";
  nameRegex = /^(?:[A-ZÄÖÜ][a-zäöüß]+|[A-ZÄÖÜ]\.) [A-ZÄÖÜ][a-zäöüß]+(?:-[A-ZÄÖÜ][a-zäöüß]+)?$/;
  mailPatternCorrect: any = "false";
  mailRegEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
  messageInputcontainsText: boolean = false;
  checkerChecked: boolean = false;

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
    this.correctlyFilled = true;
    if (!this.correctlyFilled) {
      return;
    } else {
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

  filledOutCorrectly() {
    this.checkName();
    this.checkMail();
    this.checkMessage();
    this.checkerChecking();
  }

  checkName(event: any = null) {
    if(this.yourNameInput.nativeElement.value === "" && event.key === "Tab") { return; }
    if (!this.nameRegex.test(this.yourNameInput.nativeElement.value)) {
      this.namePatternCorrect = false;
      this.yourNameLabelE.nativeElement.style.color = "#ff0000";
      this.yourNameLabelG.nativeElement.style.color = "#ff0000";
      this.correctlyFilled = false;
    }  else {
      this.namePatternCorrect = true;
      this.yourNameLabelE.nativeElement.style.color = "#3DCFB6";
      this.yourNameLabelG.nativeElement.style.color = "#3DCFB6";
    }
    this.enableDisableButton();
  }

  checkMail(event: any = null) {
    if(this.yourMailInput.nativeElement.value === "" && event.key === "Tab") { return; }
    if (!this.mailRegEx.test(this.yourMailInput.nativeElement.value)) {
      this.mailPatternCorrect = false;
      this.yourMailLabelE.nativeElement.style.color = "#ff0000";
      this.yourMailLabelG.nativeElement.style.color = "#ff0000";
      this.correctlyFilled = false;
    } else {
      this.yourMailLabelE.nativeElement.style.color = "#3DCFB6";
      this.yourMailLabelG.nativeElement.style.color = "#3DCFB6";
      this.mailPatternCorrect = true;
    }
    this.enableDisableButton();
  }

  checkMessage(event: any = null) {
    if(this.yourMailInput.nativeElement.value === "" && event.key === "Tab") { return; }
    if (this.yourMessageInput.nativeElement.value === "") {
      this.yourMessageLabelE.nativeElement.style.color = "#ff0000";
      this.yourMessageLabelG.nativeElement.style.color = "#ff0000";
      this.correctlyFilled = false;
      this.messageInputcontainsText = false;
    } else {
      this.yourMessageLabelE.nativeElement.style.color = "#3DCFB6";
      this.yourMessageLabelG.nativeElement.style.color = "#3DCFB6";
      this.correctlyFilled = true;
      this.messageInputcontainsText = true;
    }
    this.enableDisableButton();
  }

  checkerChecking() {
    if (!this.checkerChecked) {
      this.checker.nativeElement.style.outline = "2px solid #ff0000";
      this.checker.nativeElement.style.background = "#ff0000";
      this.correctlyFilled = false;
    } else {
      this.checker.nativeElement.style.outline = "2px solid #3DCFB6";
      this.checker.nativeElement.style.background = "#3DCFB6";
    }
    this.enableDisableButton();
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
