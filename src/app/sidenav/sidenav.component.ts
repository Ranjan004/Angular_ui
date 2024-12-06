import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
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
  SnackbarComponent,
  TooltipDirective,
} from 'sistem';
import { TrimTextPipe } from '../trim-text.pipe';

interface SessionData {
  vehicleNo: string;
  booking: string;
  timeIn: string;
  timeOut: string;
  advance: string;
  pass: string;
  vehicleAmt: string;
  helmetAmt: string;
  totalAmt: number;
  helmet: string;
  totalTime: string;
  collection: string;
  refund: string;
  total: string;
  mode: string;
  remarks: string;
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
    SnackbarComponent,
    TrimTextPipe,
    TooltipDirective,
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  baseUrl = environment.baseUrl;
  sessions: SessionData[] = [];

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

  constructor(
    private cdr: ChangeDetectorRef,
    private title: Title,
    private userService: UserService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

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
  totalSessions: any;
  currentPage: number = 1;
  rowsPerPage: number = 25;
  totalPages: number = 1;
  isChecked: boolean = false;
  checkedRows: Set<number> = new Set();
  tempPage: number | null = this.currentPage;
  errorMessage: string | null = null;
  sortField: string | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';
  parking_id = '';

  isSkeletonVisible: boolean = true;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.parking_id = params['id'] || '';
    });
    // set title
    this.title.setTitle('Sistem - Sessions');
    this.paginat();
    // this.totalSessions = this.sessions.length;
    this.updatePagination();
    this.loadData();
    this.fetchVehicleData();
    this.getParkingUserDetails();
  }

  fetchVehicleData() {
    const parkingId = this.parking_id || '';
    const page = this.currentPage || 1;
    const orderBy = 'createdAt:DESC';
    const limit = this.rowsPerPage;

    this.userService.vehicleList(parkingId, page, orderBy, limit).subscribe(
      (response) => {
        console.log(response.count);
        this.totalSessions = response.count;
        if (response && Array.isArray(response.rows)) {
          this.sessions = response.rows.map((item: any) => {
            const vehicle = item.vehicle || {};
            const formatDate = (dateString: string) => {
              if (!dateString) return 'N/A';
              const date = new Date(dateString);
              const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
              const months = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ];
              const day = days[date.getDay()];
              const dateNum = date.getDate().toString().padStart(2, '0');
              const month = months[date.getMonth()];
              const year = date.getFullYear().toString().slice(-2);
              const hours = date.getHours();
              const minutes = date.getMinutes().toString().padStart(2, '0');
              const amPm = hours >= 12 ? 'PM' : 'AM';
              const formattedHours = hours % 12 || 12;

              return `${day} ${dateNum} ${month} ${year} ${formattedHours}:${minutes}${amPm}`;
            };

            const totalHelmetAmt = Array.isArray(item.helmets)
              ? item.helmets.reduce(
                  (sum: number, helmet: any) => sum + (helmet.total || 0),
                  0
                )
              : '-';

            return {
              vehicleNo: vehicle.regNumber || '',
              booking: item.bookingTime ? 'yes' : 'no',
              pass: item.vehicleInPass || '-',
              timeIn: formatDate(item.inTime),
              remarks: item.remarks || '-',
              timeOut: formatDate(item.outTime),
              advance: item.advance || '0',
              totalTime: item.hours ? `${item.hours} hrs` : '0 mins',
              collection: item.total || '0',
              refund: item.refund || '0',
              total: item.total || '0',
              mode: item.paymentMode || '-',
              reference: item.refNumber || '',
              vehicleType: item.vehicleTypes,
              vehicleIcon:
                item.type === 'bike'
                  ? '../../../../assets/images/icons/bike.svg'
                  : '../../../../assets/images/icons/car.svg',
              status: item.status || '-',
              operator:
                (item.inBy?.firstName || '') +
                ' ' +
                (item.inBy?.lastName || 'N/A'),
              helmet:
                Array.isArray(item.helmets) && item.helmets.length > 0
                  ? item.helmets.length
                  : '-',

              helmetAmt: totalHelmetAmt,
              totalAmt: totalHelmetAmt + item.total,
              startDate: formatDate(item.createdAt),
              endDate: formatDate(item.updatedAt),
            };
          });
          this.updatePagination();
          // this.cdr.detectChanges();
          this.updateTags();
        } else {
          console.warn('No valid rows found in response:', response);
        }
      },
      (error) => {
        console.error('Error fetching vehicle data:', error);
      }
    );

    // console.log('sessions loaded', this.sessions);
  }

  getParkingUserDetails() {
    // Call API to get parking user details
    this.userService.parkingUserDetail().subscribe(
      (response) => {
        this.operatorList = [
          'Operator',
          ...response.map((res: any) => `${res.firstName} ${res.lastName}`),
        ];
        // console.log(this.operatorList);
      },
      (error) => {
        console.error('Error fetching parking user details:', error);
      }
    );
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

  paginat() {
    this.totalPages = Math.ceil(this.sessions.length / this.rowsPerPage);
    this.totalSessions = this.sessions.length;
    this.filteredSessions = [...this.sessions];
    this.updateTags();
    // this.updatePaginatedSessions();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    this.paginatedSessions = this.sessions.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.totalSessions / this.rowsPerPage);
    // console.log('Paginated Sessions:', this.sessions);
  }

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
      this.fetchVehicleData();
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
      this.fetchVehicleData();
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
    // console.log('Selected Date Range:', this.selectedRange);
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
    this.filteredSessions = [...this.sessions];

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

    // Filter by vehicle type
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

    // Update tags (e.g., the number of filtered items)
    this.updateTags();

    // Reset pagination to page 1 after filtering
    this.currentPage = 1;
    this.updatePaginatedSessions();
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
    this.fetchVehicleData();
  }
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // data shorting
  sortSessions(column: string): void {
    if (this.sortColumn === column) {
      // Toggle sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Change column and reset direction
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    // Perform the sorting
    this.sessions = this.sessions.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  getSortIcon(column: string): SafeHtml {
    if (this.sortColumn !== column) return '';

    const ascendingIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
</svg>
`;

    const descendingIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
</svg>
`;

    const icon = this.sortDirection === 'asc' ? ascendingIcon : descendingIcon;
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }

  @ViewChild(ModalComponent) modal!: ModalComponent;
  openTemplateOne(modalContentOne: any) {
    this.modal.openModal(modalContentOne);
  }
}
