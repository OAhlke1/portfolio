import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'icon-button',
  standalone: true,
  imports: [],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent extends ButtonComponent {
  @Input() link!:string;
  @Input() iconSource!:string;
  @Input() containsMailAddress:boolean = false;
}
