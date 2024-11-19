import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ButtonsComponent } from '../buttons/buttons.component';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'ui-snackbar',
  standalone: true,
  imports: [CommonModule, ButtonsComponent, AvatarComponent],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css',
})
export class SnackbarComponent {
  @Input() msg?: string = 'Snackbar';
  @Input() text?: string = 'Snackbar Response';
  @Input() action?: string = 'Undo';
  @Input() icon?: string = '../../assets/images/icons/snack.svg';
  showIcon = true;

  showSnackbar = true;

  ngOnInit() {
    this.hideSnackBar();
  }
  hideSnackBar() {
    this.showSnackbar = true;
    setTimeout(() => {
      this.showSnackbar = true;
    }, 5000);
  }
}
