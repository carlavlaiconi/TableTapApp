import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { EmployeesService } from 'src/app/services/employees.service';
import { TablesService } from 'src/app/services/tables.service';
import { TablesStatService } from 'src/app/services/tablesStat.service';
import { Employee } from 'src/models/employee.model';
import { TablesModel } from 'src/models/tables.model';
import { TablesStatusModel } from 'src/models/tablesStatus.model';


@Component({
  selector: 'app-view-tables-modal',
  templateUrl: './view-tables-modal.component.html',
  styleUrls: ['./view-tables-modal.component.scss'],
})
export class ViewTablesModalComponent  implements OnInit {

  public mode='edit/add';
  public whatToEdit='whatToedit';
  public tableItems: TablesModel[] = [];
  public table: TablesModel = {};
  public id=0;
    public deleteTableId=0;
    public showActionSheet = false;
    public employees: Employee[] = [];
    public employeesLoaded: boolean =false;
    public statusLoaded: boolean =false;
    public statuses: TablesStatusModel[] = [];

  public tableForm: FormGroup;

  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      handler: () => {
        this.deleteTable(this.deleteTableId);
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
    private tableService: TablesService,
    private employeesService: EmployeesService,
    private tableStatusService: TablesStatService,
    private fb: FormBuilder,
    private toastController: ToastController
    ) {

     this.mode = this.navParams.get('mode');
     if(this.mode=='edit')
      this.id = this.navParams.get('id')
     this.whatToEdit= this.navParams.get('whatToEdit')
 
     if(this.mode=='edit')
     this.tableForm = this.fb.group({
      empId: ['', Validators.required],
      orderId: ['', Validators.required],
      status: ['', Validators.required],
    });
    else{
      this.tableForm = this.fb.group({
        empId: ['', Validators.required],
        orderId: ['', Validators.required],
        status: ['', Validators.required],
      });
    }

   }

  async ngOnInit() {


    this.statusLoaded=false;
    this.initStatus();
    this.employeesLoaded=false;
    this.initemployees();
    if(this.mode=='edit'){
      await this.initTable(this.id);
    }
    else{
      this.table= {};
    }
  }

  initemployees() {
    this.employeesService.getAllEmployees().subscribe(
      (employee) => {  
        this.employees = employee;
        this.employeesLoaded = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  initStatus() {
    this.tableStatusService.getAllTablesStatus().subscribe(
      (status) => {  
        this.statuses = status;
        this.statusLoaded = true;
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

  getStatusName(statusId: number){
    let answer='';
    this.statuses.forEach((stat) =>
    {
      if(stat.id==statusId){
       
        answer = stat.name+' '
      }
    }
  
    )
    return answer;
  
  }

  async initTable(id: number) {
    this.tableService.getAllTables().subscribe(
      (drinks) => {
        this.tableItems = drinks.filter( (table: TablesModel) =>
        {
          if(table.id == id)
          this.table=table;
        })
      },
      (error) => {
        console.error(error);
      }
    );
  }


  async confirm(){

    if(this.whatToEdit=='table' && this.mode=='edit')
    {
      this.tableService.updateTables(this.table).subscribe(
        
      )
      const toast = await this.toastController.create({
        message: "Table " + this.table.id + ' successfully updated',
        duration: 5000, // Duration in milliseconds
        position: 'bottom' // Position of the toast
      });
      toast.present();
    }
    else if(this.whatToEdit=='table' && this.mode=='add')
    {
      this.table.status=1;
      this.table.orderId=0;
      this.tableService.insertTables(this.table).subscribe(
        
        )
        const toast = await this.toastController.create({
          message: "Table "+ this.table.id + ' successfully created',
          duration: 5000, // Duration in milliseconds
          position: 'bottom' // Position of the toast
        });
        toast.present();
    }

    return this.modalCtrl.dismiss( 'confirm');
  }

  async deleteTable(id: number){
    this.tableService.deleteTableS(this.table.id).subscribe()
    const toast = await this.toastController.create({
      message: "Table " + this.table.id + ' successfully deleted',
      duration: 5000, // Duration in milliseconds
      position: 'bottom' // Position of the toast
    });

    toast.present();
    return this.modalCtrl.dismiss( 'deleted');

  }


  triggerActionSheet(id: number){
    this.showActionSheet=true;
    this.deleteTableId = id;
  }

  
  
  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

 


}
