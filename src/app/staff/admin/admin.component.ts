import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent  implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {}

  toFood(){
    this.router.navigateByUrl('Admin/EditFoodMenu')
  }

  toStaff(){
    this.router.navigateByUrl('Admin/EditStaff')
  }

  toDrinks(){
    this.router.navigateByUrl('Admin/EditDrinksMenu')
  }

}
