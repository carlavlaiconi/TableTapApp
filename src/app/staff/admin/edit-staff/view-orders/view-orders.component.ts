import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmployeesService } from 'src/app/services/employees.service';
import { OrderService } from 'src/app/services/orders.service';
import { TablesService } from 'src/app/services/tables.service';
import { Employee } from 'src/models/employee.model';
import { Order } from 'src/models/order.model';
import { TablesModel } from 'src/models/tables.model';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss'],
})
export class ViewOrdersComponent  implements OnInit {

  
    public orders: Order[] =[];
    public employees: Employee[]=[];
    public order: Order={};
    public employee : Employee = {};
    public ordersLoaded: boolean = false;
    public employeesLoaded: boolean =false;
    public tablesLoaded: boolean =false;
    public toastController: any;
    public deleteOrderId=0;
    public showActionSheet = false;
  
    constructor(
      public tablesService: TablesService,
      public employeeService: EmployeesService,
      public odersService: OrderService,
      private modalCtrl: ModalController
    ) { }

  

    async ngOnInit() {
      this.ordersLoaded=false;
      await this.initOrders();
 
      this.employeesLoaded=false;
      this.initemployees();
    
      
    }

    initOrders() {
      this.odersService.getAllOrders().subscribe(
        (order) => {  
          this.orders = order;
          this.ordersLoaded = true;
        },
        (error) => {
          console.error(error);
        }
      );
    }

    initemployees() {
      this.employeeService.getAllEmployees().subscribe(
        (employee) => {  
          this.employees = employee;
          this.employeesLoaded = true;
        },
        (error) => {
          console.error(error);
        }
      );
    }


   getEmpName(empid: number){
    let answer='';
    this.employees.forEach((emp) =>
    {
      if(emp.id==empid){
        answer = emp.fName+' '+ emp.lName
      }
    }
    )
    return answer;
  
  }
   

    

}
