import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { FoodCategoriesService } from 'src/app/services/foodCategories.service';
import { FoodService } from 'src/app/services/foods.service';
import { categoryModel } from 'src/models/category.model';
import { foodItem } from 'src/models/food.menu';


@Component({
  selector: 'app-food-modal',
  templateUrl: './food-modal.component.html',
  styleUrls: ['./food-modal.component.scss'],
})
export class FoodModalComponent  implements OnInit {

  public mode='edit/add';
  public whatToEdit='whatToedit'
  public foodItems: foodItem[] = [];
  public food: foodItem = {};
  public id=0;
  public deleteFoodId=0;
  public showActionSheet = false;
  public category: categoryModel={};
  public categories: categoryModel[] = [];
  public categoryChoosen: boolean =false;
  public categoryId: number = -1;
  public deleteCategoryId=0;
  public showActionSheetCategory = false;

  foodForm: FormGroup;

  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      handler: () => {
        this.deleteFood(this.deleteFoodId);
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
    private foodService: FoodService,
    private foodCategoriesService: FoodCategoriesService,
    private fb: FormBuilder,
    private toastController: ToastController
    ) {

     this.mode = this.navParams.get('mode');
     if(this.mode=='edit')
      this.id = this.navParams.get('id')
     this.whatToEdit= this.navParams.get('whatToEdit')
 
     if(this.mode=='edit' && this.whatToEdit=='food')
     this.foodForm = this.fb.group({
      name: ['', Validators.required],
      ingredients: ['', Validators.required],
      kcal: ['', Validators.required],
      photoPath: ['', Validators.required],
      allergens: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
    });
    else if( this.mode==='add' && this.whatToEdit=='food'){
      this.foodForm = this.fb.group({
        name: ['', Validators.required],
        ingredients: ['', Validators.required],
        kcal: ['', Validators.required],
        allergens: ['', Validators.required],
        price: ['', Validators.required],
        category: ['', Validators.required],
      });
    }else
    this.foodForm = this.fb.group({
      name: ['', Validators.required],
    });
    
   }

  async ngOnInit() {

    await this.initCategories();

    this.categoryChoosen=false;

    if(this.whatToEdit=='food'){
      if(this.mode=='edit'){
        await this.initFood(this.id);
      }
      else{
        this.food= {};
      }
    }else if(this.whatToEdit=='category'){
      if(this.mode=='add'){
        this.category={};
      }
    
  }

  this.categoryId=-1;
}

async initCategory(id: number) {
  this.foodCategoriesService.getAllFoodCategories().subscribe(
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

  async initFood(id: number) {
    this.foodService.getAllFoodMenu().subscribe(
      (foods) => {
        this.foodItems = foods.filter( (food: foodItem) =>
        {
          if(food.id == id)
          this.food=food;
        })
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

  async confirm(){

    if(this.whatToEdit=='food' && this.mode=='edit')
    {
      this.foodService.updateFoodMenu(this.food).subscribe(
        
      )
      const toast = await this.toastController.create({
        message: this.food.name + ' successfully updated',
        duration: 5000, // Duration in milliseconds
        position: 'bottom' // Position of the toast
      });
      toast.present();
    }
    else if(this.whatToEdit=='food' && this.mode=='add')
    {
      this.food.photoPath='assets/foods/'+this.food.name+'.jpg'
      this.foodService.insertFoodMenu(this.food).subscribe(
        
        )
        const toast = await this.toastController.create({
          message: this.food.name + ' successfully created',
          duration: 5000, // Duration in milliseconds
          position: 'bottom' // Position of the toast
        });
        toast.present();
    }

    else if(this.whatToEdit=='category' && this.mode=='edit')
    {
      this.foodCategoriesService.putFoodCategories(this.category).subscribe(
        )
        const toast = await this.toastController.create({
          message: this.category.name + ' successfully edited',
          duration: 5000, // Duration in milliseconds
          position: 'bottom' // Position of the toast
        });
        toast.present();
    }
    else if(this.whatToEdit=='category' && this.mode=='add')
    {
        this.foodCategoriesService.insertFoodCategory(this.category).subscribe(
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

 async deleteFood(id: number){
    this.foodService.deleteFoodMenu(id).subscribe()
    const toast = await this.toastController.create({
      message: this.food.name + ' successfully deleted',
      duration: 5000, // Duration in milliseconds
      position: 'bottom' // Position of the toast
    });
    toast.present();

    return this.modalCtrl.dismiss( 'deleted');
  }

  async deleteCategory(id: number){
    this.foodCategoriesService.deleteFoodCategories(id).subscribe()
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
    this.deleteFoodId = id;
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
