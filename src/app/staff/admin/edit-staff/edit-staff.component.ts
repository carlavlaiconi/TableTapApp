import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss'],
})
export class EditStaffComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  viewStaff() {
    this.router.navigateByUrl('Admin/ViewStaff');
  }

  viewOrders() {
    this.router.navigateByUrl('Admin/ViewOrders');
  }

  viewTables() {
    this.router.navigateByUrl('Admin/ViewTables');
  }
}
