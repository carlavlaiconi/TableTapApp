import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { EmpRolesService } from 'src/app/services/empRoles.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { TablesService } from 'src/app/services/tables.service';
import { UsersService } from 'src/app/services/users.service';
import { EmpRole } from 'src/models/empRole.model';
import { Employee } from 'src/models/employee.model';
import { TablesModel } from 'src/models/tables.model';
import { Users } from 'src/models/users.model';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-viwe-staff-modal',
  templateUrl: './viwe-staff-modal.component.html',
  styleUrls: ['./viwe-staff-modal.component.scss'],
})
export class ViweStaffModalComponent  implements OnInit {


  public mode='edit/add';
  public whatToEdit='whatToedit';
  public employees: Employee[] = [];
  public employee: Employee = {};
  public id=0;
  public deletedEmployeeId=0;
  public showActionSheet = false;
  public user: Users={};
  public roles: EmpRole[]=[];
  private rolesLoaded: boolean = false;

  public EmployeeForm: FormGroup;

  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      handler: () => {
        this.deleteEmp(this.deletedEmployeeId);
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
    private employeesService: EmployeesService,
    private usersService : UsersService,
    private roleService: EmpRolesService,
    private fb: FormBuilder,
    private toastController: ToastController,
    
    ) {

     this.mode = this.navParams.get('mode');
     if(this.mode=='edit')
      this.id = this.navParams.get('id')
     this.whatToEdit= this.navParams.get('whatToEdit')
 
     if(this.mode=='edit')
     this.EmployeeForm = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      role: ['', Validators.required],
      created: ['', Validators.required],
      
    });
    else{  
      this.EmployeeForm = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      role: ['', Validators.required],
      created: ['', Validators.required],
      username:['', Validators.required],
      password:['', Validators.required],
      });
    }

   }

  async ngOnInit() {

    this.rolesLoaded=false;
    this.initRoles();

    if(this.mode=='edit'){
      await this.initEmployee(this.id);
      await this.initUsers(this.id);
    }
    else{
      this.employee= {};
      this.user={};
      
    }
  }

  async initEmployee(id: number) {
    this.employeesService.getAllEmployees().subscribe(
      (employees) => {
        this.employees = employees.filter( (employee: Employee) =>
        {
          if(employee.id == id)
          this.employee=employee;
        })
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async initUsers(id: number) {
    this.usersService.getAllUsers().subscribe(
      (users) => {
        this.user = users.filter( (user: Users) =>
        {
          if(this.employee.userId == user.id)
          this.user = user;
        })
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async initRoles() {
    this.roleService.getAllEmployeeRoles().subscribe(
      (roles) => {
        this.roles = roles;
        this.rolesLoaded = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getRoleName(roleId: number){
    let answer='';
    this.roles.forEach((role) =>
    {
      if(role.id==roleId){
       
        answer = role.role+' '
      }
    }
  
    )
    return answer;
  
  }


  async confirm() {
    if (this.whatToEdit == 'employee' && this.mode == 'edit') {
      this.employeesService.updateEmployee(this.employee).subscribe();
  
      const toast = await this.toastController.create({
        message: this.employee.fName + ' ' + this.employee.lName + ' successfully updated',
        duration: 5000, // Duration in milliseconds
        position: 'bottom' // Position of the toast
      });
      toast.present();
    } else if (this.whatToEdit == 'employee' && this.mode == 'add') {
      // const md5 = new Md5();
      // let encPass = md5.start().appendStr(this.user.Password!).end();
      
      // let passwordString = '';
      // for (let i = 0; i < encPass!.length; i++) {
      //   passwordString += String.fromCharCode(encPass![i]);
      // }

// this.user.Password = passwordString;
    
      //console.log(encPass);
      await this.usersService.postUsers(this.user).subscribe();
  
      let userIdFound = false;
      while (!userIdFound) {
        await this.usersService.getAllUsers().toPromise().then((users) => {
          users.forEach((user: { Username: string | undefined; id: number | undefined }) => {
            if (user.Username == this.user.Username) {
              console.log("aici");
              this.employee.userId = user.id;
              userIdFound = true;
              return;
            }
          });
        });
      }
  
      console.log(this.employee.userId);
  
      await this.employeesService.insertEmployee(this.employee).subscribe();
  
      const toast = await this.toastController.create({
        message: this.employee.fName + ' ' + this.employee.lName + ' successfully created',
        duration: 5000, // Duration in milliseconds
        position: 'bottom' // Position of the toast
      });
      toast.present();
    }
  
    return this.modalCtrl.dismiss('confirm');
  }
  
  
 


  async deleteEmp(id: number){
    this.usersService.deleteUsers(id).subscribe()
    const toast = await this.toastController.create({
      message: this.employee.fName +' '+ this.employee.lName + ' successfully deleted',
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
    this.deletedEmployeeId = id;
  }


}
