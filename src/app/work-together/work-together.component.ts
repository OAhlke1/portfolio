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
  @ViewChild('submitButton') submitButton!:ElementRef;
  http = inject(HttpClient);
  contactData = {
    name: "",
    email: "",
    message: "",
    receivingMail: ""
  }
  mailTest = false;

  constructor(public portService:PortfolioService, public router:Router) { }

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
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            console.log(response);
            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
    }
  }
}
