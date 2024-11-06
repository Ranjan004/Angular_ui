import { CommonModule } from '@angular/common';
import { Component, Input, HostBinding } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

interface MenuItem {
  route: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'ui-navigation',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent {
  @HostBinding('class.collapsed') get collapsedClass() {
    return this.isCollapsed;
  }

  isCollapsed: boolean = false; 
  @Input() variant: 'primary' | 'secondary' = 'secondary'; 
  @Input() menuItems: MenuItem[] = []; 
  @Input() collapsIcon: string = 'assets/images/icons/Loader.svg'; 


  collapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
  onImageError() {
    console.error('Error loading collapsIcon:', this.collapsIcon);
    this.collapsIcon = 'assets/images/icons/default-icon.svg'; 
  }
}
