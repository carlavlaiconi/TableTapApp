import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { DrinkService } from 'src/app/services/drinks.service';
import { EmpRolesService } from 'src/app/services/empRoles.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { FoodService } from 'src/app/services/foods.service';
import { OrderService } from 'src/app/services/orders.service';
import { TablesService } from 'src/app/services/tables.service';
import { TablesStatService } from 'src/app/services/tablesStat.service';
import { drinkItem } from 'src/models/drink.menu';
import { EmpRole } from 'src/models/empRole.model';
import { Employee } from 'src/models/employee.model';
import { foodItem } from 'src/models/food.menu';
import { Order } from 'src/models/order.model';
import { TablesModel } from 'src/models/tables.model';
import { TablesStatusModel } from 'src/models/tablesStatus.model';

@Component({
  selector: 'app-orders-modal',
  templateUrl: './orders-modal.component.html',
  styleUrls: ['./orders-modal.component.scss'],
})
export class OrdersModalComponent  implements OnInit {

  public tableStatus: TablesStatusModel[] =[];
  public tables: TablesModel[] =[];
  public table: TablesModel = {};
  public waiter: Employee = {};
  public tableOrders: Order[] = [];
  public drinks: drinkItem[] = [];
  public foods: foodItem[] = [];

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private tablesService: TablesService,
    private tablesStatusService: TablesStatService,
    private empService: EmployeesService,
    private ordersService: OrderService,
    private foodService: FoodService,
    private drinkService: DrinkService
  ) {
    this.table = this.navParams.get('table');
   }

  async ngOnInit() {

    await this.initMenuItems();
    await this.initTableStatus();
    await this.initEmployees();
    await this.initTableOrders();
    await this.initTables();

    console.log(this.tableOrders);
  }

  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(){

  }

  async initMenuItems(){
    this.foodService.getAllFoodMenu().subscribe((foods) => this.foods=foods);
    this.drinkService.getAllDrinkMenu().subscribe((drinks) => this.drinks=drinks)
  }

  async initTableStatus(){
    this.tablesStatusService.getAllTablesStatus().subscribe((statuses) =>
     { this.tableStatus=statuses;}
    )
  }

  async initTables(){
    this.tablesService.getAllTables().subscribe((tables) => {
      this.tables=tables.filter((table: TablesModel) => table.empId = this.waiter.id )
    })
  }

  async initEmployees(){
    this.empService.getAllEmployees().subscribe((emps) =>
    {
     emps.forEach((emp: Employee) => {
      if(emp.id==Number(localStorage.getItem('userId')))
        this.waiter=emp;
     })
    })
  }

  async initTableOrders(){
      this.ordersService.getAllOrders().subscribe((orders) =>{
        orders.forEach((order: Order)=> {
          if( order.tableId==this.table.id && order.status!='past'){
            this.processOrder(order);
            this.tableOrders.push(order)
          }
        })
        console.log(this.tableOrders)
      })
  }

  markDelivered(order: Order){
    order.status='delivered'
      this.ordersService.putOrders(order).subscribe();
  }

  closeTable(){

    this.tableOrders.forEach((order)=>{
      order.status='past';
      this.ordersService.putOrders(order).subscribe();
    })

    this.table.status=1;
    this.tablesService.putTables(this.table).subscribe();

  }

  processOrder(order: Order) {
    let foodsString: any;
            if(order.items?.includes(','))
            {
              foodsString = order.items?.split(',')
    
              order.foods=[];

              foodsString.forEach((foodName: string | undefined) => {
          
                this.foods.forEach((food) => {
                  if(food.name==foodName)
                  {
                    order.foods?.push(food);
                    return ;
                  }
                })
                this.drinks.forEach((drink) => {
                  if(drink.name==foodName)
                  {
                    order.foods?.push(drink);
                    return ;
                  }
                })
              
              })

             
            }else if(!order.items?.includes(',')){
              foodsString = order.items?.split(' ')

              foodsString.forEach((string: string | undefined)=>{
                 this.foods.forEach((food) => {
                  if(food.name==string)
                    {
                      order.foods?.push(food)
                      return;
                    }
                 }),

                 this.drinks.forEach((drink) => {
                  if(drink.name==string)
                  {
                    order.foods?.push(drink)
                    return;
                  }
                 })
                }
              )
              }
      }

}
