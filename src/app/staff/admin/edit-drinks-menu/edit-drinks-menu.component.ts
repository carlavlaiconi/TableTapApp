import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DrinkCategoriesService } from 'src/app/services/drinkCategories.service';
import { DrinkService } from 'src/app/services/drinks.service';
import { categoryModel } from 'src/models/category.model';
import { drinkItem } from 'src/models/drink.menu';
import { DrinksModalComponent } from './drinks-modal/drinks-modal.component';



@Component({
  selector: 'app-edit-drinks-menu',
  templateUrl: './edit-drinks-menu.component.html',
  styleUrls: ['./edit-drinks-menu.component.scss'],
})
export class EditDrinksMenuComponent  implements OnInit {

  public drinkItems: drinkItem[] = [];
  public filteredDrinkItems: drinkItem[] = [];
  public drinkLoaded: boolean = false;
  public searchTerm: string = '';
  public search: boolean = false;
  public isOpen: boolean = false;


  categories: categoryModel[] = [];

  public deleteDrinkId=0;
  public showActionSheet = false;

  public actionSheetButtons = [
    {
      text: 'Add Drink Item',
      role: 'constructive',
      handler: () => {
        this.openModal('add', 0, 'drink');
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
    public drinkService: DrinkService,
    public drinkCategoriesService: DrinkCategoriesService,
    private modalCtrl: ModalController
    ) {}

  async ngOnInit() {

    this.search=false;
    this.drinkLoaded=false;
      await this.initCategories();
      await this.initdrink();
      
    
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

  async openModal(mode: string, id: any, whatToEdit: any){
    const modal = await this.modalCtrl.create({
      component: DrinksModalComponent,
      componentProps: { mode: mode, id: id, whatToEdit: whatToEdit }
    });

    modal.onDidDismiss().then(async () => {
      await this.initCategories();
      await this.initdrink();
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
