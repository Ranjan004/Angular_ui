import { Component,Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.css'
})
export class SideNavigationComponent {
  isCollapsed:boolean=false;
  @Input() variant: 'primary' | 'secondary'  = 'secondary';

  collapsed(){
    this.isCollapsed = !this.isCollapsed;
  }

}
