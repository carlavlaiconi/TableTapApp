import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { DrinkCategoriesService } from 'src/app/services/drinkCategories.service';
import { DrinkService } from 'src/app/services/drinks.service';
import { FoodCategoriesService } from 'src/app/services/foodCategories.service';
import { FoodService } from 'src/app/services/foods.service';
import { categoryModel } from 'src/models/category.model';
import { drinkItem } from 'src/models/drink.menu';
import { foodItem } from 'src/models/food.menu';

@Component({
  selector: 'app-drinks-modal',
  templateUrl: './drinks-modal.component.html',
  styleUrls: ['./drinks-modal.component.scss'],
})
export class DrinksModalComponent  implements OnInit {

  public mode='edit/add';
  public whatToEdit='whatToedit'
  public drinkItems: drinkItem[] = [];
  public drink: drinkItem = {};
  public categories: categoryModel[] = [];
  public id=0;
  public deleteDrinkId=0;
  public showActionSheet = false;
  public category : categoryModel={};
 
  public categoryChoosen: boolean =false;
  public categoryId: number = -1;
  public deleteCategoryId=0;
  public showActionSheetCategory = false;
  drinkForm: FormGroup;

  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      handler: () => {
        this.deleteDrink(this.deleteDrinkId);
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

   
  public categoryActionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      handler: () => {
        this.deleteCategory(this.deleteCategoryId);
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
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private drinkService: DrinkService,
    private drinkCategoriesService: DrinkCategoriesService,
    private fb: FormBuilder,
    private toastController: ToastController
    ) {

     this.mode = this.navParams.get('mode');
     if(this.mode=='edit')
      this.id = this.navParams.get('id')
     this.whatToEdit= this.navParams.get('whatToEdit')
 
     if(this.mode=='edit' && this.whatToEdit=='drink')
     this.drinkForm = this.fb.group({
      name: ['', Validators.required],
      ingredients: ['', Validators.required],
      photoPath: ['', Validators.required],
      allergens: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
    });
    else if(this.mode=='add' && this.whatToEdit=='drink' ){
      this.drinkForm = this.fb.group({
        name: ['', Validators.required],
        ingredients: ['', Validators.required],
        allergens: ['', Validators.required],
        price: ['', Validators.required],
        category: ['', Validators.required],
      });
    }else
    this.drinkForm = this.fb.group({
      name: ['', Validators.required],
    });

   }

  async ngOnInit() {

    await this.initCategories();

    this.categoryChoosen=false;

    if(this.whatToEdit=='drink'){
      if(this.mode=='edit'){
        await this.initDrink(this.id);
      }
      else{
        this.drink= {};
      }
    }else if(this.whatToEdit=='category'){
      if(this.mode=='add'){
        this.category={};
      }
    
  }

  this.categoryId=-1;
}

  async initDrink(id: number) {
    this.drinkService.getAllDrinkMenu().subscribe(
      (drinks) => {
        this.drinkItems = drinks.filter( (drink: drinkItem) =>
        {
          if(drink.id == id)
          this.drink=drink;
        })
      },
      (error) => {
        console.error(error);
      }
    );
  }

 
  async initCategory(id: number) {
    this.drinkCategoriesService.getAllDrinkCategories().subscribe(
      (categories) => {
        this.categories = categories.filter( (category: categoryModel) =>
        {
          if(category.id == id)
          this.category=category;
        })
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

  async confirm(){

    if(this.whatToEdit=='drink' && this.mode=='edit')
    {
      this.drinkService.updateDrinkMenu(this.drink).subscribe(
        
      )
      const toast = await this.toastController.create({
        message: this.drink.name + ' successfully updated',
        duration: 5000, // Duration in milliseconds
        position: 'bottom' // Position of the toast
      });
      toast.present();
    }
    else if(this.whatToEdit=='drink' && this.mode=='add')
    {
      this.drink.photoPath='assets/drinks/'+this.drink.name+'.jpg'
      this.drinkService.insertDrinkMenu(this.drink).subscribe(
        
        )
        const toast = await this.toastController.create({
          message: this.drink.name + ' successfully created',
          duration: 5000, // Duration in milliseconds
          position: 'bottom' // Position of the toast
        });
        toast.present();
    }

    else if(this.whatToEdit=='category' && this.mode=='edit'){
    
    this.drinkCategoriesService.putDrinkCategories(this.category).subscribe(
        
        )
        const toast = await this.toastController.create({
          message: this.category.name + ' successfully updated',
          duration: 5000, // Duration in milliseconds
          position: 'bottom' // Position of the toast
        });
        toast.present();
    }
    else if(this.whatToEdit=='category' && this.mode=='add')
    {
      this.drinkCategoriesService.postDrinkCategories(this.category).subscribe(
        
        )
        const toast = await this.toastController.create({
          message: this.category.name + ' successfully created',
          duration: 5000, // Duration in milliseconds
          position: 'bottom' // Position of the toast
        });
        toast.present();
    }

    return this.modalCtrl.dismiss( 'confirm');
  }

 async deleteDrink(id: number){
    this.drinkService.deleteDrinkMenu(id).subscribe()
    const toast = await this.toastController.create({
      message: this.drink.name + ' successfully deleted',
      duration: 5000, // Duration in milliseconds
      position: 'bottom' // Position of the toast
    });
    toast.present();
    return this.modalCtrl.dismiss( 'deleted');
  }

  async deleteCategory(id: number){
    this.drinkCategoriesService.deleteDrinkCategories(id).subscribe()
    const toast = await this.toastController.create({
      message: this.category.name + ' successfully deleted',
      duration: 5000, // Duration in milliseconds
      position: 'bottom' // Position of the toast
    });
    toast.present();

    return this.modalCtrl.dismiss( 'deleted');
  }

  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  triggerActionSheet(id: number){
    this.showActionSheet=true;
    this.deleteDrinkId = id;
  }

  triggerActionSheetCategory(id: number){

    this.showActionSheetCategory=true;
    this.deleteCategoryId = id;
  }

  onCategoryChange (){
    if(this.categoryId!=-1)
      {
        this.categoryChoosen=true;
        this.categories.forEach((category) => {
          if(category.id==this.categoryId){
            this.category=category;
            return;
          }
        })
        console.log(this.category)
      }
      else this.categoryChoosen=false;
  }


}
