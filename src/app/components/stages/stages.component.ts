import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-stages',
  standalone: true,
  imports: [],
  templateUrl: './stages.component.html',
  styleUrl: './stages.component.css'
})
export class StagesComponent {
  @Input() variant: 'complete' | 'active' | 'pending' | 'lead' = 'active';
  @Input() lable?: string ='Stage name';
}
