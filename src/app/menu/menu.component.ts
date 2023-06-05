import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
 

  constructor(
    public router: Router
  ) {}
  async ngOnInit() {}

  toFood(){
    this.router.navigateByUrl('Menu/FoodMenu')
  }

  toDrink(){
    this.router.navigateByUrl('Menu/DrinkMenu')
  }
  toCart(){
    this.router.navigateByUrl('Menu/Cart')
  }
  }

  

  
  