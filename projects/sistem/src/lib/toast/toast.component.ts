import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  @Input() toast: 'info' | 'success' | 'warning' | 'error' = 'info';
  @Input() message: string = 'Information message';
  @Input() heading: string = 'Info';

  isClose: boolean = false;
  isShown:boolean = false;


  ngOnInit() {
    setTimeout(() => {
      this.isShown = true;
    }, 1000); 

    setTimeout(() => {
      this.closeToast();

    }, 5000); 
  }



  get iconPath(): string {
    switch (this.toast) {
      case 'info':
        return '../assets/images/icons/info.svg';
      case 'success':
        return '../assets/images/icons/success.svg';
      case 'warning':
        return '../assets/images/icons/warning.svg';
      case 'error':
        return '../assets/images/icons/error.svg';
      default:
        return '';
    }
  }

  get closeIconPath(): string {
    switch (this.toast) {
      case 'info':
        return '../../../assets/images/icons/infi-cross.svg';
      case 'success':
        return '../../../assets/images/icons/success-cross.svg';
      case 'warning':
        return '../../../assets/images/icons/warning-cross.svg';
      case 'error':
        return '../../../assets/images/icons/error-cross.svg';
      default:
        return '';
    }
  }

  closeToast() {
    this.isClose = true;
    this.isShown = false;
  }

 
}
