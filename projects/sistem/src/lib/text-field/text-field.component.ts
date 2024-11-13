import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-text-field',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent {
  title: string = '';
  wordCount: number = 0;
  isFocused: boolean = false;
  errorMessage: string = 'Please enter only numbers.';  
  
  @Input() variant: 'primary' | 'secondary' = 'secondary';
  @Input() shape?: 'round' | 'corner' | 'default' = 'round';
  @Input() hasError: boolean = false;  
  @Input() error: boolean = false;  
  @Input() disable: boolean = false;  
  
  filterInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // const filteredValue = input.value.replace(/[^0-9]/g, ''); 
    // if (input.value !== filteredValue) {
    //   this.hasError = true;
    // } else {
    //   this.hasError = false;
    // }
    // this.title = filteredValue; 
    this.wordCountFun(); 
  }

  wordCountFun(): void {
    this.wordCount = this.title.replace(/\s/g, '').length;
  }

  handleFocus(): void {
    this.isFocused = true; 
  }

  handleBlur(): void {
    this.isFocused = false; 
  }
}
