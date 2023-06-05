import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodCategoriesService } from 'src/app/services/foodCategories.service';
import { FoodService } from 'src/app/services/foods.service';
import { categoryModel } from 'src/models/category.model';
import { foodItem } from 'src/models/food.menu';
import { FoodModalComponent } from './food-modal/food-modal.component';

@Component({
  selector: 'app-edit-food-menu',
  templateUrl: './edit-food-menu.component.html',
  styleUrls: ['./edit-food-menu.component.scss'],
})
export class EditFoodMenuComponent implements OnInit {

  public foodItems: foodItem[] = [];
  public food: foodItem ={};
  public filteredFoodItems: foodItem[] = [];
  public foodLoaded: boolean = false;
  public searchTerm: string = '';
  public search: boolean = false;
  public showActionSheet = false;
  public editCategory : boolean=false;
  isOpen = false;
 


  categories: categoryModel[] = [];

  public actionSheetButtons = [
    {
      text: 'Add Food Item',
      role: 'constructive',
      handler: () => {
        this.openModal('add', 0, 'food');
      }
    },
    {
      text: 'Add Category',
      role: 'constructive',
      handler: () => {
        this.openModal('add', 0, 'category')
      }
    },
    {
      text: 'Edit Category',
      role: 'constructive',
      handler: () => {
        this.openModal('edit', 0, 'category')
      }
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  constructor(
    public foodService: FoodService,
    public foodCategoriesService: FoodCategoriesService,
    private modalCtrl: ModalController
    ) {}

  async ngOnInit() {

    this.search=false;
    this.foodLoaded=false;
      await this.initCategories();
      await this.initFood();
      
    
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

  async openModal(mode: string, id: any, whatToEdit: any){
    const modal = await this.modalCtrl.create({
      component: FoodModalComponent,
      componentProps: { mode: mode, id: id, whatToEdit: whatToEdit }
    });

    modal.onDidDismiss().then(async () => {
      await this.initCategories();
      await this.initFood();
    });

    modal.present();

  }

  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  triggerActionSheet(){
    this.showActionSheet=true;
  }

  
}
