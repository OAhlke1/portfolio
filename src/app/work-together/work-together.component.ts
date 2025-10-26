import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { NgClass } from "../../../node_modules/@angular/common/";
import { PortfolioService } from '../shared/services/portfolio-service.service';
import { ButtonComponent } from "../shared/buttons/button.component";
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'work-together',
  standalone: true,
  imports: [NgClass, ButtonComponent, FormsModule],
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
  regEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

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
    this.filledOutCorrectly();
    if (!this.correctlyFilled) {
      return;
    } else { // if (ngForm.submitted && ngForm.form.valid) {
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
    this.checkerChecked();
  }

  checkName() {
    if (this.yourNameInput.nativeElement.value === "") {
      this.yourNameLabelE.nativeElement.style.color = "#ff0000";
      this.yourNameLabelG.nativeElement.style.color = "#ff0000";
      this.correctlyFilled = false;
    } else {
      this.yourNameLabelE.nativeElement.style.color = "#3DCFB6";
      this.yourNameLabelG.nativeElement.style.color = "#3DCFB6";
    }
  }

  checkMail() {
    if (this.yourMailInput.nativeElement.value === "") {
      this.yourMailLabelE.nativeElement.style.color = "#ff0000";
      this.yourMailLabelG.nativeElement.style.color = "#ff0000";
      this.correctlyFilled = false;
    } else {
      if (!this.regEx.test(this.yourMailInput.nativeElement.value)) {
        this.yourMailLabelE.nativeElement.style.color = "#ff0000";
        this.yourMailLabelG.nativeElement.style.color = "#ff0000";
        this.correctlyFilled = false;
      } else {
        this.yourMailLabelE.nativeElement.style.color = "#3DCFB6";
        this.yourMailLabelG.nativeElement.style.color = "#3DCFB6";
      }
    }
  }

  checkMessage() {
    if (this.yourMessageInput.nativeElement.value === "") {
      this.yourMessageLabelE.nativeElement.style.color = "#ff0000";
      this.yourMessageLabelG.nativeElement.style.color = "#ff0000";
      this.correctlyFilled = false;
    } else {
      this.yourMessageLabelE.nativeElement.style.color = "#3DCFB6";
      this.yourMessageLabelG.nativeElement.style.color = "#3DCFB6";
    }
  }

  checkerChecked() {
    if (!this.checker.nativeElement.checked) {
      this.checker.nativeElement.style.outline = "2px solid #ff0000";
      this.checker.nativeElement.style.background = "#ff0000";
      this.correctlyFilled = false;
    } else {
      this.checker.nativeElement.style.outline = "2px solid #3DCFB6";
      this.checker.nativeElement.style.background = "#3DCFB6";
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
