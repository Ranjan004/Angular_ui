import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'ui-toggle',
  standalone: true,
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit {
  @Output() toggleChange = new EventEmitter<boolean>();
  isChecked: boolean = false;

  ngOnInit() {
    this.setInitialTheme();
  }

  setInitialTheme() {
    // Check if the system prefers dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isChecked = prefersDarkMode;
    this.toggleChange.emit(this.isChecked); 
  }

  onToggle(event: Event) {
    const target = event.target as HTMLInputElement;
    this.isChecked = target.checked;
    this.toggleChange.emit(this.isChecked); // Emit the new state to the parent
  }
}
