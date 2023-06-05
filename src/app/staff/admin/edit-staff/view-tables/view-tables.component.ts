import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
  import { TablesService } from 'src/app/services/tables.service';
  import { TablesStatService } from 'src/app/services/tablesStat.service';
  import { TablesModel } from 'src/models/tables.model';
  import { TablesStatusModel } from 'src/models/tablesStatus.model';
import { ViewTablesModalComponent } from './view-tables-modal/view-tables-modal.component';
import { mode } from 'crypto-js';
import { EmployeesService } from 'src/app/services/employees.service';
import { Employee } from 'src/models/employee.model';

@Component({
  selector: 'app-view-tables',
  templateUrl: './view-tables.component.html',
  styleUrls: ['./view-tables.component.scss'],
})
export class ViewTablesComponent  implements OnInit {

  
    public tables: TablesModel[] =[];
    public employees: Employee[]=[];
    public employee : Employee = {};
    public tablesStats: TablesStatusModel[] = [];
    public tablesLoaded: boolean = false;
    public employeesLoaded: boolean =false;
    public tableService: any;
    public toastController: any;
    public table: any;
    public deleteTableId=0;
    public showActionSheet = false;
  
    constructor(
      public tablesService: TablesService,
      public employeeService: EmployeesService,
      public tablesStatsService: TablesStatService,
      private modalCtrl: ModalController
    ) { }

  

    async ngOnInit() {
      this.tablesLoaded=false;
      await this.inittables();
      this.employeesLoaded=false;
      this.initemployees();
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
   
  
    async inittables() {
      this.tablesService.getAllTables().subscribe(
        (tabless) => {  
          this.tables = tabless;
          this.tablesLoaded = true;
        },
        (error) => {
          console.error(error);
        }
      );
    }
 
  
  
    async openModal(mode: string, id: any, whatToEdit: any){
      const modal = await this.modalCtrl.create({
        component: ViewTablesModalComponent,
        componentProps: { mode: mode, id: id, whatToEdit: whatToEdit }
      });
      modal.onDidDismiss().then(async () => {
        await this.inittables();
      });
      modal.present();
    }

    
  
  
  
  }
  