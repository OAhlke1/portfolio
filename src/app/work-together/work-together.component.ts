import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { NgClass } from "../../../node_modules/@angular/common/";
import { PortfolioService } from '../shared/services/portfolio-service.service';
import { ButtonComponent } from "../shared/buttons/button.component";
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'work-together',
  standalone: true,
  imports: [NgClass, ButtonComponent, FormsModule],
  templateUrl: './work-together.component.html',
  styleUrl: './work-together.component.scss'
})
export class WorkTogether {
  @ViewChild('submitButton') submitButton!:ElementRef;
  http = inject(HttpClient);
  contactData = {
    name: "",
    email: "",
    message: ""
  }
  mailTest = false;

  constructor(public portService:PortfolioService) { }

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
    console.log('läuft vielleicht', ngForm);
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
      console.log(ngForm);
      ngForm.resetForm();
    }
  }
}
