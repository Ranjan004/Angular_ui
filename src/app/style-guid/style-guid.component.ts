import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import {
  ButtonsComponent,
  TabComponent,
  IconComponent,
  TextFieldComponent,
  CalendarComponent,
  DoubleCalendarComponent,
  DropdownComponent,
  ToastComponent,
  AvatarComponent,
  TypographyComponent,
  SearchComponent,
  RadioButtonComponent,
  CheckboxComponent,
  ToggleComponent,
  NumberComponent,
  TagsComponent,
  BreadcrumbsComponent,
  SideNavigationComponent,
  TooltipDirective,
  StagesComponent,
  ModalComponent,
} from 'sistem';

@Component({
  selector: 'app-style-guid',
  standalone: true,
  imports: [
    TabComponent,
    ButtonsComponent,
    IconComponent,
    TextFieldComponent,
    DoubleCalendarComponent,
    DropdownComponent,
    ToastComponent,
    AvatarComponent,
    TypographyComponent,
    SearchComponent,
    RadioButtonComponent,
    CheckboxComponent,
    ToggleComponent,
    NumberComponent,
    TagsComponent,
    BreadcrumbsComponent,
    SideNavigationComponent,
    TooltipDirective,
    StagesComponent,
    ModalComponent,
  ],
  templateUrl: './style-guid.component.html',
  styleUrl: './style-guid.component.css',
})
export class StyleGuidComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  statusList = ['Dropdown list', 'in vehicle', 'out vehicle', 'booking'];

  onStatusSelectionChange(category: string): void {
    console.log('Selected category:', category);
  }

  @ViewChild(ModalComponent) modal!: ModalComponent;
  openTemplateOne(modalContentOne: any) {
    this.modal.openModal(modalContentOne);
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
    {
      name: 'Sudesh kumar',
      role: 'Contact',
      company: 'Aadinath Retails',
      category: 'Sales',
      image: 'assets/images/icons/Avatar.svg',
      description: 'Description',
    },
    {
      name: 'Anita Rao',
      role: 'Contact',
      company: 'Global Trade',
      category: 'eCommerce',
      image: 'assets/images/icons/Avatar.svg',
      description: 'Description',
    },
  ];

  breadcrumbs = [
    { label: 'Home', url: '/style-guid' },
    { label: 'About', url: '' },
  ];

  menuItems = [
    { route: '/style-guid', label: 'Session', icon: 'bell' },
    { route: '/radio-button', label: 'Radio btn', icon: 'home' },
    {
      route: '/style-guid',
      label: 'Checkbox',
      icon: 'chat-bubble-bottom-center',
    },
    { route: '/toggle', label: 'Toggle', icon: 'device-phone-mobile' },
    { route: '/text', label: 'Text', icon: 'information-circle' },
    { route: '/otp', label: 'OTP', icon: 'question-mark-circle' },
    {
      route: '/calendar',
      label: 'Calendar',
      icon: 'chat-bubble-oval-left-ellipsis',
    },
    { route: '/number', label: 'Number', icon: 'arrow-up-tray' },
    { route: '/search', label: 'Search', icon: 'magnifying-glass' },
    { route: '/sidebar', label: 'Sidebar', icon: 'shield-exclamation' },
  ];
}
