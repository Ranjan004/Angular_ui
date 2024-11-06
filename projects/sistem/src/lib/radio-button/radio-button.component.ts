import { Component,Input } from '@angular/core';

@Component({
  selector: 'ui-radio-button',
  standalone: true,
  imports: [],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.css'
})
export class RadioButtonComponent {
  @Input() size: 'large' | 'small' = 'small';
  @Input() lable?: string;
}
