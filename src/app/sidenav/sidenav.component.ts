import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {
  BreadcrumbsComponent,
  ButtonsComponent,
  CheckboxComponent,
  DoubleCalendarComponent,
  DropdownComponent,
  IconComponent,
  NotificationComponent,
  SearchComponent,
  VehicalComponent,
  AvatarComponent,
  ModalComponent,
} from 'sistem';

interface SessionData {
  vehicleNo: string;
  booking: string;
  timeIn: string;
  timeOut: string;
  advance: string;
  totalTime: string;
  collection: string;
  refund: string;
  total: string;
  mode: string;
  reference: string;
  vehicleType: string;
  vehicleIcon: string;
  status: string;
  operator: string;
  selected?: boolean;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    IconComponent,
    CommonModule,
    BreadcrumbsComponent,
    ButtonsComponent,
    NotificationComponent,
    SearchComponent,
    DropdownComponent,
    DoubleCalendarComponent,
    FormsModule,
    VehicalComponent,
    CheckboxComponent,
    AvatarComponent,
    ModalComponent,
    RouterModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  isSidebarClosed = false;
  subMenusState: Record<number, boolean> = {};
  // topTag: { label: string; url: string }[] = [];

  toggleSidebar(): void {
    this.isSidebarClosed = !this.isSidebarClosed;
    if (this.isSidebarClosed) {
      this.closeAllSubMenus();
    }
  }

  toggleSubMenu(index: number): void {
    if (this.subMenusState[index]) {
      this.subMenusState[index] = false;
    } else {
      this.closeAllSubMenus();
      this.subMenusState[index] = true;
    }

    // If any submenu is open, remove the 'close' class from the sidebar
    if (Object.values(this.subMenusState).includes(true)) {
      this.isSidebarClosed = false;
    }
  }

  closeAllSubMenus(): void {
    this.subMenusState = {};
  }

  constructor(private cdr: ChangeDetectorRef, private title: Title) {}

  selectedRange: { startDate: Date | null; endDate: Date | null } | null = null;
  topTag: { label: string; url: string }[] = [];
  bottomTag: { label: string; url: string }[] = [];
  sessionTypes = ['type', 'Car', 'Bike', 'Cycle', 'Truck'];
  operatorList = ['operator', 'operator 1', 'operator 2', 'operator 3'];
  statusList = ['Status', 'in vehicle', 'out vehicle', 'booking'];
  selectedType = this.sessionTypes[0];
  selectedOperator = this.operatorList[0];
  selectedStatus = this.statusList[0];
  filteredSessions: SessionData[] = [];
  paginatedSessions: SessionData[] = [];
  totalSessions: number = 0;
  currentPage: number = 1;
  rowsPerPage: number = 25;
  totalPages: number = 1;
  isChecked: boolean = false;
  checkedRows: Set<number> = new Set();
  tempPage: number | null = this.currentPage;
  errorMessage: string | null = null;
  sortField: string | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';

  isSkeletonVisible: boolean = true;
  ngOnInit() {
    // set title
    this.title.setTitle('Sistem - Sessions');
    this.paginat();
    this.totalSessions = this.sessions.length;
    this.updatePagination();
    this.loadData();
  }

  // loading data animations
  loadData(): void {
    this.simulateAsyncOperation().then(() => {
      this.isSkeletonVisible = false;
    });
  }

  simulateAsyncOperation(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });
  }

  menuItems = [
    { route: '/session', label: 'Session', icon: 'bell' },
    {
      route: '/radio-button',
      label: 'Radio btn',
      icon: '../../../assets/images/icons/dark.svg',
    },
    {
      route: '/checkbox',
      label: 'Checkbox',
      icon: '../../../assets/images/icons/dark.svg',
    },
    {
      route: '/toggle',
      label: 'Toggle',
      icon: '../../../assets/images/icons/dark.svg',
    },
    {
      route: '/text',
      label: 'Text',
      icon: '../../../assets/images/icons/dark.svg',
    },
    {
      route: '/otp',
      label: 'OTP',
      icon: '../../../assets/images/icons/dark.svg',
    },
    {
      route: '/calendar',
      label: 'Calendar',
      icon: '../../../assets/images/icons/dark.svg',
    },
    {
      route: '/number',
      label: 'Number',
      icon: '../../../assets/images/icons/dark.svg',
    },
    {
      route: '/search',
      label: 'Search',
      icon: '../../../assets/images/icons/dark.svg',
    },
    {
      route: '/sidebar',
      label: 'Sidebar',
      icon: '../../../assets/images/icons/dark.svg',
    },
  ];

  // sessions: SessionData[] = [
  //   {
  //     vehicleNo: 'uk073035',
  //     booking: 'yes',
  //     timeIn: '10:00 AM',
  //     timeOut: '10:30 AM',
  //     advance: '10',
  //     totalTime: '30 mins',
  //     collection: '100',
  //     refund: '10',
  //     total: '90',
  //     mode:'cash',
  //     reference: 'Ref 1',
  //     vehicleType: 'bike',
  //     vehicleIcon: '../../../../assets/images/icons/bike.svg',
  //     status: 'in vehicle',
  //     operator: 'operator 1',
  //   },
  // ];

  sessions: SessionData[] = Array.from({ length: 60 }, (_, index) => {
    const vehicleTypes: ('bike' | 'car' | 'cycle')[] = ['bike', 'car', 'cycle'];
    const vehicleIcons: { bike: string; car: string; cycle: string } = {
      bike: '../../../../assets/images/icons/bike.svg',
      car: '../../../../assets/images/icons/car.svg',
      cycle: '../../../../assets/images/icons/cycle.svg',
    };

    const randomVehicleType =
      vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];

    // Generate random start and end dates
    const baseDate = new Date();
    const startDate = new Date(baseDate);
    startDate.setDate(baseDate.getDate() - Math.floor(Math.random() * 30)); // up to 30 days in the past
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5)); // up to 5 days after startDate

    return {
      vehicleNo: `uk07${String(3000 + index).padStart(4, '0')}`,
      booking: Math.random() > 0.5 ? 'yes' : 'no',
      timeIn: `${Math.floor(9 + (index % 12))}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      timeOut: `${Math.floor(10 + ((index + 1) % 12))}:${Math.floor(
        Math.random() * 60
      )
        .toString()
        .padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      advance: `${Math.floor(Math.random() * 100)}`,
      totalTime: `${Math.floor(15 + Math.random() * 45)} mins`,
      collection: `${Math.floor(100 + Math.random() * 400)}`,
      refund: `${Math.floor(Math.random() * 50)}`,
      total: `${Math.floor(80 + Math.random() * 420)}`,
      mode: Math.random() > 0.5 ? 'cash' : 'card',
      reference: `Ref ${index + 1}`,
      vehicleType: randomVehicleType,
      vehicleIcon: vehicleIcons[randomVehicleType],
      status: Math.random() > 0.5 ? 'in vehicle' : 'out vehicle',
      operator: `operator ${Math.floor(1 + Math.random() * 5)}`,
      startDate: startDate.toISOString().split('T')[0], // format as YYYY-MM-DD
      endDate: endDate.toISOString().split('T')[0], // format as YYYY-MM-DD
    };
  });

  paginat() {
    this.totalPages = Math.ceil(this.sessions.length / this.rowsPerPage);
    this.totalSessions = this.sessions.length;
    this.filteredSessions = [...this.sessions];
    this.updateTags();
    this.updatePaginatedSessions();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    this.paginatedSessions = this.sessions.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.totalSessions / this.rowsPerPage);
  }

  // updatePaginatedSessions() {
  //   const startIndex = (this.currentPage - 1) * this.rowsPerPage;
  //   const endIndex = startIndex + this.rowsPerPage;
  //   this.paginatedSessions = this.sessions.slice(startIndex, endIndex);
  // this.isSkeletonVisible = true;
  // setTimeout(() => {
  //   this.filterSessions();
  //   this.updatePaginatedSessions();
  //   this.isSkeletonVisible = false;
  // }, 2000);
  // }

  updatePaginatedSessions() {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    this.paginatedSessions = this.filteredSessions.slice(startIndex, endIndex);
    this.isSkeletonVisible = true;
    setTimeout(() => {
      this.filterSessions();
      // this.updatePaginatedSessions();
      this.isSkeletonVisible = false;
    }, 2000);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedSessions();
    }
    this.isSkeletonVisible = true;
    setTimeout(() => {
      this.filterSessions();
      this.updatePaginatedSessions();
      this.isSkeletonVisible = false;
    }, 2000);
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedSessions();
    }
    this.isSkeletonVisible = true;
    setTimeout(() => {
      this.filterSessions();
      this.updatePaginatedSessions();
      this.isSkeletonVisible = false;
    }, 2000);
  }

  onTypeSelectionChange(selectedType: any) {
    this.selectedType = selectedType;
  }

  onOperatorSelectionChange(selectedOperator: any) {
    this.selectedOperator = selectedOperator;
  }

  onStatusSelectionChange(selectedStatus: any) {
    this.selectedStatus = selectedStatus;
  }

  onDateRangeSelected(range: { startDate: Date | null; endDate: Date | null }) {
    this.selectedRange = range;
    console.log('Selected Date Range:', this.selectedRange);
  }

  applyFilter() {
    this.filterSessions();
    this.isSkeletonVisible = true;
    setTimeout(() => {
      this.filterSessions();
      this.updatePaginatedSessions();
      this.isSkeletonVisible = false;
    }, 2000);
  }

  filterSessions() {
    this.filteredSessions = [...this.sessions]; // Reset to all sessions first

    const isTypeFiltered =
      this.selectedType && this.selectedType !== this.sessionTypes[0];
    const isOperatorFiltered =
      this.selectedOperator && this.selectedOperator !== this.operatorList[0];
    const isStatusFiltered =
      this.selectedStatus && this.selectedStatus !== this.statusList[0];
    const isDateRangeFiltered =
      this.selectedRange &&
      this.selectedRange.startDate &&
      this.selectedRange.endDate;

    // Filter by type
    if (isTypeFiltered) {
      this.filteredSessions = this.filteredSessions.filter(
        (session) =>
          session.vehicleType.toLowerCase() === this.selectedType.toLowerCase()
      );
    }

    // Filter by operator
    if (isOperatorFiltered) {
      this.filteredSessions = this.filteredSessions.filter(
        (session) =>
          session.operator.toLowerCase() === this.selectedOperator.toLowerCase()
      );
    }

    // Filter by status
    if (isStatusFiltered) {
      this.filteredSessions = this.filteredSessions.filter(
        (session) =>
          session.status.toLowerCase() === this.selectedStatus.toLowerCase()
      );
    }

    // Filter by date range
    if (isDateRangeFiltered && this.selectedRange) {
      const { startDate, endDate } = this.selectedRange;
      this.filteredSessions = this.filteredSessions.filter((session) => {
        const sessionDate = new Date(session.startDate);
        return sessionDate >= startDate! && sessionDate <= endDate!;
      });
    }

    // Update total sessions and pages based on filtered data
    this.totalSessions = this.filteredSessions.length;
    this.totalPages = Math.ceil(this.totalSessions / this.rowsPerPage);

    this.updateTags();
  }

  clearFilters() {
    // Reset filter selections
    this.selectedType = this.sessionTypes[0]; // Default type
    this.selectedOperator = this.operatorList[0]; // Default operator
    this.selectedStatus = this.statusList[0]; // Default status
    this.selectedRange = { startDate: null, endDate: null }; // Reset date range

    // Reset filtered and paginated sessions
    this.filteredSessions = [...this.sessions]; // Reset to all sessions
    this.currentPage = 1; // Reset to the first page
    this.updatePaginatedSessions(); // Update paginated data

    // Update total counts and tags
    this.totalSessions = this.filteredSessions.length;
    this.updateTags();
  }

  updateTags() {
    this.topTag = [
      { label: `${this.totalSessions} items`, url: '/' },
      { label: 'Sorted by CREATED AT', url: '/' },
    ];
    this.bottomTag = [
      { label: `Total: ${this.totalSessions} items`, url: '/' },
    ];
  }

  // Method to handle "Select All" checkbox change
  selectAll(event: any): void {
    const checked = event?.target?.checked;

    if (checked) {
      // Add all indices for the current page to checkedRows
      this.paginatedSessions.forEach((_, i) => {
        const globalIndex = (this.currentPage - 1) * this.rowsPerPage + i;
        this.checkedRows.add(globalIndex);
      });
    } else {
      // Remove all indices for the current page from checkedRows
      this.paginatedSessions.forEach((_, i) => {
        const globalIndex = (this.currentPage - 1) * this.rowsPerPage + i;
        this.checkedRows.delete(globalIndex);
      });
    }
  }

  // Check if a specific row is checked
  isRowChecked(index: number): boolean {
    const globalIndex = (this.currentPage - 1) * this.rowsPerPage + index;
    return this.checkedRows.has(globalIndex);
  }

  // Method to handle individual checkbox change
  onCheckboxChange(event: any, index: number): void {
    const checked = event?.target?.checked;
    const globalIndex = (this.currentPage - 1) * this.rowsPerPage + index;

    if (checked) {
      this.checkedRows.add(globalIndex);
    } else {
      this.checkedRows.delete(globalIndex);
    }
  }

  // Check if all rows on the current page are checked
  areAllRowsChecked(): boolean {
    return this.paginatedSessions.every((_, i) =>
      this.checkedRows.has((this.currentPage - 1) * this.rowsPerPage + i)
    );
  }

  onEnterPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.tempPage = this.tempPage
        ? Math.max(1, Math.min(this.tempPage, this.totalPages))
        : 1;
      this.goToPage(this.tempPage);
    }
  }

  goToPage(page: number) {
    if (isNaN(page) || page < 1) {
      this.currentPage = 1;
    } else if (page > this.totalPages) {
      this.currentPage = this.totalPages;
    } else {
      this.currentPage = page;
    }
    this.updatePaginatedSessions();
  }

  // data shorting
  sortSessions(field: keyof SessionData) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.paginatedSessions.sort((a, b) => {
      const valueA = a[field] ?? '';
      const valueB = b[field] ?? '';

      if (valueA < valueB) return this.sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  getSortIcon(field: keyof SessionData): string {
    if (this.sortField === field) {
      return this.sortOrder === 'asc' ? '↑' : '↓';
    }
    return '';
  }

  @ViewChild(ModalComponent) modal!: ModalComponent;
  openTemplateOne(modalContentOne: any) {
    this.modal.openModal(modalContentOne);
  }
}
