import { Component, Input, OnInit, OnChanges, SimpleChanges, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ui-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit, OnChanges {
  @Input() icons: 'suffix' | 'prefix' = 'suffix';
  @Input() dropdownList: string[] = ['All Parking', 'Sales', 'eCommerce', 'Parking'];
  @Input() size: 'large' | 'medium' | 'small' = 'medium';
  @Input() isDropdown: string = 'notHave';
  @Input() searchList: { label: string; url?: string }[] = [];
  @Input() contacts: { name: string; role: string; company: string; category: string; image: string; description: string }[] = [];
  
  @Output() selectionChange = new EventEmitter<string>();  // Output property

  searchTerm: string = '';
  isFocused: boolean = false;
  showDropdown: boolean = false;
  selectedCategory: string = '';
  typing: boolean = false;
  
  filteredContacts: { name: string; role: string; company: string; category: string; image: string; description: string }[] = [];

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.setDefaultCategory(); // Set the first value as the default category
    this.filterContacts(); // Filter contacts based on the default category
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contacts']) {
      this.filterContacts(); 
    }

    if (changes['dropdownList']) {
      this.setDefaultCategory(); 
      this.filterContacts(); 
    }
  }

  private setDefaultCategory(): void {
    if (this.dropdownList.length > 0) {
      this.selectedCategory = this.dropdownList[0]; // Select the first value by default
    }
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category; 
    this.showDropdown = false; 
    this.filterContacts(); 
    this.selectionChange.emit(this.selectedCategory);  // Emit selected value
  }

  hideDropdown(): void {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  filterContacts(): void {
    this.isFocused = this.searchTerm.length > 0;

    this.filteredContacts = this.contacts.filter(contact => {
      const matchesCategory = 
        contact.category.toLowerCase() === this.selectedCategory.toLowerCase() || 
        this.selectedCategory === this.dropdownList[0];
      const matchesSearch = contact.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  // Close dropdown if clicked outside
  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement): void {
    if (!this.elementRef.nativeElement.contains(target)) {
      this.showDropdown = false;
    }
  }
}
