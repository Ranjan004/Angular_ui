import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';


@Component({
  selector: 'ui-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @Input() size: 'xxl' | 'xl' | 'md' | 'sm' | 'xsm' = 'xxl';
  @Input() variant: 'primary' | 'secondary' = 'secondary';
  @Input() shape: 'default' | 'circle'  = 'default';
  @Input() notificationIcon?: string;
  defaultIcon: string = '../assets/images/icons/info.svg';
}
