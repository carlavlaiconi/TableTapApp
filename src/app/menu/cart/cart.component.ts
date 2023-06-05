import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DrinkCategoriesService } from 'src/app/services/drinkCategories.service';
import { DrinkService } from 'src/app/services/drinks.service';
import { EmpRolesService } from 'src/app/services/empRoles.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { FoodCategoriesService } from 'src/app/services/foodCategories.service';
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
import { SharedModule } from 'src/shared.module';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent  implements OnInit {

  public orders: Order[] = [];
  public pendingOrder: Order ={};
  public total: number = 0;
  public checkRequested: boolean = false;

  public tables: TablesModel[] = [];
  public table: TablesModel = {};
  public tablesStatuses: TablesStatusModel[] = [];
  public employees: Employee[] = [];
  public empRoles: EmpRole[] = [];
  public drinks: drinkItem[] = [];
  public foods: foodItem[] = [];


  constructor(
    private employeesService: EmployeesService,
    private empRolesService: EmpRolesService,
    private tableService: TablesService,
    private tableStatusService: TablesStatService,
    private ordersService: OrderService,
    private toastController: ToastController,
    public foodService: FoodService,
    public foodCategoriesService: FoodCategoriesService,
    public drinkService: DrinkService,
    public drinkCategoriesService: DrinkCategoriesService
  ) { 
  }

  async ngOnInit() {

  

    this.pendingOrder= SharedModule.pendingOrder

    await this.initData();

    await this.initAllOrders();

  
  }

  requestCheck(){
    this.checkRequested=true;
   

    this.tables.forEach((table) => {

      if(table.id==Number(localStorage.getItem('assignedTablId'))){

      this.table=table;

      this.pendingOrder.waiterId=table.empId;
      return;
    }
  })

  this.table.status=3;

    this.orders.forEach((order) =>
    {
      order.status='closed';
      this.ordersService.putOrders(order).subscribe();
    })

    this.tableService.putTables(this.table).subscribe();
  }

async initAllOrders(){
  await this.ordersService.getAllOrders().subscribe(
    (orders) => {
      SharedModule.orders=orders
      orders.forEach((order: Order) => {
        // if(order.tableId=SharedModule.assignedTablId)
        if(order.tableId==Number(localStorage.getItem('assignedTablId')) && order.status!='past')
          {
            let foodsString: any;
            if(order.items?.includes(','))
            {
              foodsString = order.items?.split(',')
           
              console.log(foodsString)
              order.foods=[];

              foodsString.forEach((foodName: string | undefined) => {
                console.log(foodName)
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

            if(order.status!='closed')
            this.orders.push(order);
          }
          
      })
    }
)

}


  removeFromList(item: foodItem | drinkItem) {

    const index = this.pendingOrder.foods!.indexOf(item);
    this.pendingOrder.foods!.splice(index, 1);

  }

  private async initData(){

    this.employeesService.getAllEmployees().subscribe( (employees)=>{
      this.employees=employees
    })

    this.empRolesService.getAllEmployeeRoles().subscribe( (empRoles)=>{
      this.empRoles=empRoles
    })

    this.tableService.getAllTables().subscribe( (tables)=>{
      this.tables=tables
       
    this.tables.forEach((table)=>{
      if(table.id==Number(localStorage.getItem('assignedTablId')))
      {
       this.table=table;
        if(this.table.status!<3)
        this.checkRequested=false;
        else
        this.checkRequested=true;
       return;
      }
    })

    console.log(this.table)
    })

    this.tableStatusService.getAllTablesStatus().subscribe( (tablesStatus)=>{
      this.tablesStatuses=tablesStatus
    })


    this.drinkService.getAllDrinkMenu().subscribe(
      (drinks) => {
        this.drinks = drinks;
      },
      (error) => {
        console.error(error);
      }
    );

    
    this.foodService.getAllFoodMenu().subscribe(
      (foods) => {
        this.foods = foods;
      },
      (error) => {
        console.error(error);
      }
    );

  }
  
  
  calculateTotal(order: Order): number {
    let total: number = 0;
 
    for(let i=0; i<order.foods!.length; i++)
      total+=+order.foods![i].price!;

    order.total=total;
    return total;
  }

  async sendOrder(){
    this.pendingOrder.items='';
    this.pendingOrder.foods!.forEach((element, index) => {
      this.pendingOrder.items += element.name;
      if (index < this.pendingOrder.foods!.length - 1) {
        this.pendingOrder.items += ',';
      }
    });

    this.tables.forEach((table) => {
      if(table.id==Number(localStorage.getItem('assignedTablId')))
        this.pendingOrder.waiterId=table.empId;
    })

    this.pendingOrder.status='sent';
    this.pendingOrder.tableId=Number(localStorage.getItem('assignedTablId'));


    
    this.tables.forEach((table) => {

        if(table.id==Number(localStorage.getItem('assignedTablId'))){

        this.table=table;

        this.pendingOrder.waiterId=table.empId;
        return;
      }
    })

    let statusId: number=-1;
   this.tablesStatuses.forEach((status) =>{
    if(status.name=='open')
    {
      
      
      if(this.table.status!=status.id)
      {
        this.table.status=status.id;

        this.tableService.putTables(this.table).subscribe();
      }
      return ;
    }
   })

 

    SharedModule.pendingOrder=this.pendingOrder
   this.orders.push(this.pendingOrder);
    SharedModule.orders.push(this.pendingOrder);

    this.pendingOrder.foods=[];
    this.pendingOrder={}
   

    await this.ordersService.postOrders(this.pendingOrder).subscribe(
      async (success) => {
        
        const toast = await this.toastController.create({
          message: 'Order Sent Successfully!',
          duration: 2000,
          position: 'bottom'
        });

        toast.present();
      
    }
    
    )



    this.ordersService.getAllOrders().subscribe( (orders) =>
      {
        SharedModule.orders = orders;
      }
    )

  }
  
   
}
