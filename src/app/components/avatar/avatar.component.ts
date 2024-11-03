import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'ui-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
  @Input() size: 'xxl' | 'xl' | 'md' | 'sm' | 'xsm' = 'xxl';
  @Input() shape: 'default' | 'circle'  = 'circle';
  @Input() avatarIcon?: string;
  @Input() label?: string;
  defaultIcon: string = '../../../assets/images/icons/larg.svg';
}
