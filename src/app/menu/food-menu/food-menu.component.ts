import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FoodCategoriesService } from 'src/app/services/foodCategories.service';
import { FoodService } from 'src/app/services/foods.service';
import { OrderService } from 'src/app/services/orders.service';
import { categoryModel } from 'src/models/category.model';
import { foodItem } from 'src/models/food.menu';
import { Order } from 'src/models/order.model';
import { SharedModule } from 'src/shared.module';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.scss'],
})
export class FoodMenuComponent  implements OnInit {

  public foodItems: foodItem[] = [];
  public filteredFoodItems: foodItem[] = [];
  public foodLoaded: boolean = false;
  public searchTerm: string = '';
  public search: boolean = false;
  public orders: Order[] = [];

  categories: categoryModel[] = [];

  constructor(
    public foodService: FoodService,
    public foodCategoriesService: FoodCategoriesService,
    private modalCtrl: ModalController,
    private orderService: OrderService,
    public toastController: ToastController
    ) {}

  async ngOnInit() {

    this.search=false;
    this.foodLoaded=false;
      await this.initCategories();
      await this.initFood();
    this.orders= SharedModule.orders;
      
    
  }

  filterByCategory(category: number): foodItem[] {
    let foodInCategory: foodItem[] = [];
    this.foodItems.forEach((foodItem) => {
      if (foodItem.category == category) foodInCategory.push(foodItem);
    });
    return foodInCategory;
  }


  async initFood() {
    this.foodService.getAllFoodMenu().subscribe(
      (foods) => {
        this.foodItems = foods;
        this.foodLoaded = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async initCategories() {
    this.foodCategoriesService.getAllFoodCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public searchFood(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    if(searchTerm!=''){
    this.search= true;
  
    if (!searchTerm) {
      // If the search term is empty, reset the food items array
      this.filteredFoodItems = this.foodItems;
    } else {
      // Filter the food items array based on the search term
      this.filteredFoodItems = this.foodItems.filter((item) =>
        item.name!.toLowerCase().includes(searchTerm)
      );
    }
  } else
    this.search=false;
  }

  public clearSearch(){
    this.search=false;
  }

 public async addToCart(item: foodItem) {

    const toast = await this.toastController.create({
      message: item.name + ' added to cart',
      duration: 2000, // Duration in milliseconds
      position: 'bottom' // Position of the toast
    });
   



    if(!SharedModule.pendingOrder.foods)
    {
      SharedModule.pendingOrder.foods=[];
      SharedModule.pendingOrder.foods.push(item)
      toast.present();
    }
    else{
      
      SharedModule.pendingOrder.foods.push(item)
      toast.present();
    }
  }
  

  
}
