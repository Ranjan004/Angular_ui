import {
  Component,
  TemplateRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from '../buttons/buttons.component';
import { NotificationComponent } from '../notification/notification.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { icons } from '../icons';

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [CommonModule, ButtonsComponent, NotificationComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() variant: 'primary' | 'secondary' | 'outlined' | 'text' = 'primary';
  @Input() size: 'xsmall' | 'small' | 'medium' | 'large' = 'large';
  @Input() shape: 'round' | 'corner' | 'ovel' = 'ovel';
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  @Input() label?: string;
  @Input() loader: string = '../assets/images/icons/Loader.svg';
  @Input() disabled = false;
  @Input() title: string = 'Modal Heading';
  @Input() cancelText: string = 'Cancel';
  @Input() submitText: string = 'Submit';
  @Input() footerText?: string = 'Footer Text';

  @Input() modalBody!: TemplateRef<any>;
  isLoading: boolean = false;
  isOpen: boolean = false;

  @Output() submit = new EventEmitter<void>();

  constructor(private sanitizer: DomSanitizer) {}

  // Open modal and set body template
  openModal(bodyTemplate: TemplateRef<any>) {
    this.isOpen = true;
    this.modalBody = bodyTemplate;
  }

  // Close modal
  closeModal(): void {
    this.isOpen = false;
  }

  onCancel(): void {
    this.closeModal();
  }

  // Check if the icon is an SVG path or name
  isSvgPath(icon: string): boolean {
    return icon.endsWith('.svg') || icon.startsWith('http');
  }

  // Get sanitized SVG for inline icons
  getIconSvg(iconName: string): SafeHtml {
    const iconSvg = icons[iconName] || '';
    return this.sanitizer.bypassSecurityTrustHtml(iconSvg);
  }
}
