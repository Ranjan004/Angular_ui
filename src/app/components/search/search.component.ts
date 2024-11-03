import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Input() icons: 'suffix' | 'prefix' = 'suffix';
  @Input() categories: string[] = ['Sales', 'eCommerce', 'Parking', 'Expe'];
  @Input() sizes: 'large' | 'medium' | 'small' = 'medium';
  @Input() isCategory: string = 'isCategory';  
  
  searchTerm: string = '';
  isFocused: boolean = false;
  showDropdown: boolean = false;
  selectedCategory: string = "All Categories";
  typing: boolean = false;
  
  contacts = [
    { name: 'Sudesh Srikant', role: 'Contact', company: 'Aadinath Retails', category: 'Sales', image: '../../../assets/images/icons/Avatar.svg', description: 'Description' },
    { name: 'Anita Rao', role: 'Contact', company: 'Global Trade', category: 'eCommerce', image: '../../../assets/images/icons/Avatar.svg', description: 'Description' },
  ];
  
  filteredContacts = [...this.contacts];

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.showDropdown = false;

    if (category === 'All Categories') {
      // Reset to show all contacts if "All Categories" is selected
      this.filteredContacts = [...this.contacts];
    } else {
      // Filter contacts based on the new category and search term
      this.filterContacts();
    }
  }

  hideDropdown(): void {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  filterContacts(): void {
    this.isFocused = this.searchTerm.length > 0;

    this.filteredContacts = this.contacts.filter(contact => {
      const matchesCategory = this.selectedCategory === 'All Categories' || contact.category === this.selectedCategory;
      const matchesSearch = contact.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
}
