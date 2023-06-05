import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DrinkCategoriesService } from 'src/app/services/drinkCategories.service';
import { DrinkService } from 'src/app/services/drinks.service';
import { OrderService } from 'src/app/services/orders.service';
import { categoryModel } from 'src/models/category.model';
import { drinkItem } from 'src/models/drink.menu';
import { foodItem } from 'src/models/food.menu';
import { Order } from 'src/models/order.model';
import { SharedModule } from 'src/shared.module';

@Component({
  selector: 'app-drink-menu',
  templateUrl: './drink-menu.component.html',
  styleUrls: ['./drink-menu.component.scss'],
})
export class DrinkMenuComponent  implements OnInit {


  public drinkItems: drinkItem[] = [];
  public filteredDrinkItems: drinkItem[] = [];
  public drinkLoaded: boolean = false;
  public searchTerm: string = '';
  public search: boolean = false;
  public orders: Order[] = [];

  categories: categoryModel[] = [];

  constructor(
    public drinkService: DrinkService,
    public drinkCategoriesService: DrinkCategoriesService,
    private modalCtrl: ModalController,
    private toastController: ToastController
    ) {}

  async ngOnInit() {

    this.search=false;
    this.drinkLoaded=false;
      await this.initCategories();
      await this.initdrink();
    this.orders= SharedModule.orders;
    
  }

  filterByCategory(category: number): drinkItem[] {
    let drinkInCategory: drinkItem[] = [];
    this.drinkItems.forEach((drinkItem) => {
      if (drinkItem.category == category) drinkInCategory.push(drinkItem);
    });
    return drinkInCategory;
  }


  async initdrink() {
    this.drinkService.getAllDrinkMenu().subscribe(
      (drinks) => {
        this.drinkItems = drinks;
        this.drinkLoaded = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async initCategories() {
    this.drinkCategoriesService.getAllDrinkCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public searchDrink(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    if(searchTerm!=''){
    this.search= true;
  
    if (!searchTerm) {
      // If the search term is empty, reset the drink items array
      this.filteredDrinkItems = this.drinkItems;
    } else {
      // Filter the drink items array based on the search term
      this.filteredDrinkItems = this.drinkItems.filter((item) =>
        item.name!.toLowerCase().includes(searchTerm)
      );
    }
  } else
    this.search=false;
  }

  public clearSearch(){
    this.search=false;
  }

  public async addToCart(item: drinkItem){
       //// COMPLETE WITH WAITER & TABLE ASSIGNATION
    // let order: Order = {};

    // if(!order.foods)
    // order.foods = []

    const toast = await this.toastController.create({
      message: item.name + ' added to cart',
      duration: 2000, // Duration in milliseconds
      position: 'bottom' // Position of the toast
    });
   

   // order.foods.push(item)

    if(!SharedModule.pendingOrder.foods)
    {
      SharedModule.pendingOrder.foods=[];
      SharedModule.pendingOrder.foods.push(item)
      toast.present();
    }
    else{
      // this.orders.forEach( (order) =>{
      //   if(order.status!='closed')
      //     order.foods!.push(item)
      //     toast.present();
      // })
      SharedModule.pendingOrder.foods.push(item)
      toast.present();
    }
  
  }

 
  

}
