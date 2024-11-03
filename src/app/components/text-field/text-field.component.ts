import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [FormsModule,CommonModule], 
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent {
  title: string = '';
  wordCount: number = 0;
  isFocused: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';
  @Input() variant: 'primary' | 'secondary' = 'secondary';
  @Input() shape?: 'round' | 'corner' | 'default' ='round';

  filterInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filteredValue = input.value.replace(/[^0-9]/g, ''); 
    if (input.value !== filteredValue) {
      this.errorMessage = 'Please enter only numbers.'; 
      this.isError = true;
    } else {
      this.errorMessage = ''; 
      this.isError = false;
    }
    this.title = filteredValue; 
    input.value = this.title; 
    this.wordCountFun(); 
  }

  wordCountFun(): void {
    this.wordCount = this.title.replace(/\s/g, '').length;
    console.log(this.wordCount); 
  }


  handleFocus(): void {
    this.isFocused = true; 
    // console.log("focus In")
  }

  handleBlur(): void {
    this.isFocused = false; 
    // console.log("focus Out")
  }
}
