import { NgModule } from '@angular/core';
import { Order } from './models/order.model';
import { OrderService } from './app/services/orders.service';
import { Employee } from './models/employee.model';

@NgModule({})
export class SharedModule {
 
  public static orders: Order[] = [];
  public static pendingOrder: Order ={};
  public static assignedTablId: number;
  public static assignedWaiter: Employee = {};

  constructor(
    public ordersService: OrderService
  ){}

  async ngOnInit(){
    await this.initOrders();
  }

  async initOrders(){
    this.ordersService.getAllOrders().subscribe( (orders) => {
      SharedModule.orders=orders;
    })
  }


}
