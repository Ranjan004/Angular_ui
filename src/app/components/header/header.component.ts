import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { ThemeService } from '../../theme.service';
import {
  NotificationComponent,
  ToggleComponent,
  AvatarComponent,
  SideNavigationComponent,
  IconComponent,
  SearchComponent,
} from 'sistem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ToggleComponent,
    SearchComponent,
    SearchComponent,
    AvatarComponent,
    NotificationComponent,
    SideNavigationComponent,
    IconComponent,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit {
  isMobileMenuOpen: boolean = false;
  @ViewChild('menuContainer', { static: false }) menuContainer!: ElementRef;

  selectedVariant: 'primary' | 'secondary' | 'outlined' = 'primary';
  selectedSize: 'xsmall' | 'small' | 'medium' | 'large' = 'large';
  selectedShape: 'ovel' | 'round' | 'corner' = 'ovel';
  labelText: string = 'Text';

  isPrimaryChecked: boolean = false;
  isSecondaryChecked: boolean = false;
  isOutlineChecked: boolean = false;

  isSizeXsmallChecked: boolean = false;
  isSizeSmallChecked: boolean = false;
  isSizeMediumChecked: boolean = false;
  isSizeLargeChecked: boolean = false;

  showIconLeft: boolean = false;
  showIconRight: boolean = false;

  isOvelShapeChecked: boolean = false;
  isRoundShapeChecked: boolean = false;
  isCornerShapeChecked: boolean = false;

  isDisabled: boolean = false;

  showScrollButtonNext: boolean = false;
  showScrollButtonPrev: boolean = false;
  isDarkMode: boolean = false;

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    // this.checkScrollButtons();
    // this.renderer.listen(this.menuContainer.nativeElement, 'scroll', () => this.checkScrollButtons());
  }

  // checkScrollButtons(): void {
  //   const container = this.menuContainer.nativeElement;
  //   this.showScrollButtonNext = container.scrollWidth > container.clientWidth && container.scrollLeft < (container.scrollWidth - container.clientWidth - 10);
  //   this.showScrollButtonPrev = container.scrollLeft > 10;
  // }

  scrollNext(): void {
    const container = this.menuContainer.nativeElement;
    container.scrollBy({ left: 100, behavior: 'smooth' });
  }

  scrollPrev(): void {
    const container = this.menuContainer.nativeElement;
    container.scrollBy({ left: -100, behavior: 'smooth' });
  }

  // get dark theme
  ngOnInit() {
    this.setInitialTheme();
  }

  setInitialTheme() {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.toggleTheme(prefersDarkMode);
  }

  toggleTheme(isChecked: boolean) {
    if (isChecked) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }

  // toggleTheme(): void {
  //   this.themeService.toggleTheme();
  // }

  get isDarkTheme(): boolean {
    return this.themeService.currentTheme;
  }

  changeVariant(variant: 'primary' | 'secondary' | 'outlined'): void {
    this.selectedVariant = variant;
  }

  changeSize(size: 'xsmall' | 'small' | 'medium' | 'large'): void {
    this.isSizeXsmallChecked = size === 'xsmall';
    this.isSizeSmallChecked = size === 'small';
    this.isSizeMediumChecked = size === 'medium';
    this.isSizeLargeChecked = size === 'large';
    this.selectedSize = size;
  }

  changeShape(shape: 'ovel' | 'round' | 'corner'): void {
    this.selectedShape = shape;
    if (shape === 'round' || shape === 'corner') {
      this.showIconLeft = true;
      this.showIconRight = false;
      this.labelText = '';
    } else {
      this.showIconLeft = false;
      this.labelText = 'Text';
    }
  }

  toggleIconLeft(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.showIconLeft = inputElement.checked;
  }

  toggleIconRight(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.showIconRight = inputElement.checked;
  }

  toggleRadioState(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.isDisabled = inputElement.checked;
  }

  tabs = [
    {
      id: 1,
      title: 'Session',
      content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    },
    {
      id: 2,
      title: 'Movie',
      content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    },
    {
      id: 3,
      title: 'Hall',
      content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    },
  ];

  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'Electronics', url: '/products/electronics' },
    { label: 'Televisions' },
  ];

  menuLinks = [
    { label: 'Link1', route: 'home' },
    { label: 'Link2', route: 'about' },
    { label: 'Link3', route: 'about' },
    { label: 'Link4', route: 'service' },
    { label: 'Link5', route: 'home' },
    { label: 'Link6', route: 'about' },
    { label: 'Link7', route: 'about' },
    // { label: 'Link8', route: 'service' },
    // { label: 'Link9', route: 'home' },
    // { label: 'Link10', route: 'about' },
    // { label: 'Link11', route: 'about' },
    // { label: 'Link12', route: 'service' },
    // { label: 'Link13', route: 'about' },
    // { label: 'Link14', route: 'service' },
    // { label: 'Link15', route: 'home' },
    // { label: 'Link16', route: 'about' },
    // { label: 'Link17', route: 'about' },
    // { label: 'Link18', route: 'service' }
  ];

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.updateBodyScroll();
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.updateBodyScroll();
  }

  updateBodyScroll(): void {
    if (this.isMobileMenuOpen) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
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

  collapsIcon = 'assets/images/icons/Loader.svg';

  // NotificationService
  isNotificationsOpen = false;
  latestNotificationClicked = false;
  isAlertActive: boolean = true;

  showNotifications() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
    this.updateBodyScroll();
    console.log('isNotificationsOpen:', this.isNotificationsOpen);
    this.isAlertActive = false;
  }

  onNotificationClick(index: number): void {
    if (index === 0) {
      this.latestNotificationClicked = true;
    }
    console.log(`Notification ${index} clicked!`);
  }

  notifications = [
    {
      title: 'New order received',
      description: 'A new order has been placed for the product.',
      update: 'System Update',
      time: '30 min ago',
      status: 'pending',
      icon: '../../../assets/images/icons/avatar-2.svg',
    },
    {
      title: 'New order received',
      description: 'A new order has been placed for the product.',
      update: 'System Update',
      time: '30 min ago',
      status: 'pending',
      icon: '../../../assets/images/icons/avatar-2.svg',
    },
    {
      title: 'New order received',
      description: 'A new order has been placed for the product.',
      update: 'System Update',
      time: '30 min ago',
      status: 'pending',
      icon: '../../../assets/images/icons/avatar-2.svg',
    },
    {
      title: 'New order received',
      description: 'A new order has been placed for the product.',
      update: 'System Update',
      time: '30 min ago',
      status: 'pending',
      icon: '../../../assets/images/icons/avatar-2.svg',
    },
    {
      title: 'New order received',
      description: 'A new order has been placed for the product.',
      update: 'System Update',
      time: '30 min ago',
      status: 'pending',
      icon: '../../../assets/images/icons/avatar-2.svg',
    },
    {
      title: 'New order received',
      description: 'A new order has been placed for the product.',
      update: 'System Update',
      time: '30 min ago',
      status: 'pending',
      icon: '../../../assets/images/icons/avatar-2.svg',
    },
    {
      title: 'New order received',
      description: 'A new order has been placed for the product.',
      update: 'System Update',
      time: '30 min ago',
      status: 'pending',
      icon: '../../../assets/images/icons/avatar-2.svg',
    },
    {
      title: 'New order received',
      description: 'A new order has been placed for the product.',
      update: 'System Update',
      time: '30 min ago',
      status: 'pending',
      icon: '../../../assets/images/icons/avatar-2.svg',
    },
    {
      title: 'New order received',
      description: 'A new order has been placed for the product.',
      update: 'System Update',
      time: '30 min ago',
      status: 'pending',
      icon: '../../../assets/images/icons/avatar-2.svg',
    },
    {
      title: 'New order received',
      description: 'A new order has been placed for the product.',
      update: 'System Update',
      time: '30 min ago',
      status: 'pending',
      icon: '../../../assets/images/icons/avatar-2.svg',
    },
    {
      title: 'New order received',
      description: 'A new order has been placed for the product.',
      update: 'System Update',
      time: '30 min ago',
      status: 'pending',
      icon: '../../../assets/images/icons/avatar-2.svg',
    },
    {
      title: 'New order received',
      description: 'A new order has been placed for the product.',
      update: 'System Update',
      time: '30 min ago',
      status: 'pending',
      icon: '../../../assets/images/icons/avatar-2.svg',
    },
    {
      title: 'New order received',
      description: 'A new order has been placed for the product.',
      update: 'System Update',
      time: '30 min ago',
      status: 'pending',
      icon: '../../../assets/images/icons/avatar-2.svg',
    },
    {
      title: 'New order received',
      description: 'A new order has been placed for the product.',
      update: 'System Update',
      time: '30 min ago',
      status: 'pending',
      icon: '../../../assets/images/icons/avatar-2.svg',
    },
    {
      title: 'Order Shipped',
      description: 'Your order has been shipped.',
      update: 'Logistics',
      time: '1 hour ago',
      status: 'pending',
      icon: '../../../assets/images/icons/Avatar.svg',
    },
  ];
}
