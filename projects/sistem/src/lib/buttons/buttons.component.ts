import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-button',  
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {
  @Input() variant: 'primary' | 'secondary' | 'outlined' = 'primary';
  @Input() size: 'xsmall' | 'small' | 'medium' | 'large' = 'large';
  @Input() shape?: 'round' | 'corner' | 'ovel' ="ovel";
  @Input() iconLeft?: string; 
  @Input() iconRight?: string; 
  @Input() lable?: string;
  @Input() loader: string = '../assets/images/icons/Loader.svg';
  @Input() disabled = false; 
  isLoading: boolean = false;

  onSubmit() {
    if (this.isLoading || this.disabled) return;
    this.isLoading = true; 
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
