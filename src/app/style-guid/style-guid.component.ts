import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ButtonsComponent, TabComponent, IconComponent, TextFieldComponent, CalendarComponent, DoubleCalendarComponent,DropdownComponent, ToastComponent, AvatarComponent, TypographyComponent, SearchComponent, RadioButtonComponent, CheckboxComponent } from 'sistem';

@Component({
  selector: 'app-style-guid',
  standalone: true,
  imports: [TabComponent, ButtonsComponent, IconComponent, TextFieldComponent, DoubleCalendarComponent, DropdownComponent, ToastComponent, AvatarComponent, TypographyComponent,SearchComponent, RadioButtonComponent, CheckboxComponent],
  templateUrl: './style-guid.component.html',
  styleUrl: './style-guid.component.css'
})
export class StyleGuidComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  statusList = ['Dropdown list', 'in vehicle', 'out vehicle', 'booking'];

  onStatusSelectionChange(category: string): void {
    console.log('Selected category:', category);
  }
  

  // toaster
  isToastInfo = false;
  isToastWarning = false;
  isToastError = false;
  isToastSuccess = false;

  showInfo() {
    this.isToastInfo = false;
    setTimeout(() => {
      this.isToastInfo = true;
    }, 10);
  }

  showError() {
    this.isToastError = false;

    setTimeout(() => {
      this.isToastError = true;
 
    }, 10);

    setTimeout(() => {
      this.isToastError = false;

    }, 5000);
  }
  

  showWarning() {
    this.isToastWarning = false;

    setTimeout(() => {
      this.isToastWarning = true;
 
    }, 10);

    setTimeout(() => {
      this.isToastWarning = false;

    }, 5000);
  }

  showSuccess() {
    this.isToastSuccess = false;

    setTimeout(() => {
      this.isToastSuccess = true;
 
    }, 10);

    setTimeout(() => {
      this.isToastSuccess = false;

    }, 5000);
  }



  contactData = [
    { name: 'Sudesh kumar', role: 'Contact', company: 'Aadinath Retails', category: 'Sales', image: 'assets/images/icons/Avatar.svg', description: 'Description' },
    { name: 'Anita Rao', role: 'Contact', company: 'Global Trade', category: 'eCommerce', image: 'assets/images/icons/Avatar.svg', description: 'Description' },
  ];

  
}
