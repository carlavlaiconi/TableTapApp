import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmpRolesService } from 'src/app/services/empRoles.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { EmpRole } from 'src/models/empRole.model';
import { Employee } from 'src/models/employee.model';
import { ViweStaffModalComponent } from './viwe-staff-modal/viwe-staff-modal.component';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/models/users.model';

@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.scss'],
})
export class ViewStaffComponent  implements OnInit {

  public mode='name'
  public sort='asc'
  public users: Users[]=[];
  public user: Users={};
  public employees: Employee[] = [];
  public empRoles: EmpRole[] = [];
  public empsLoaded= false;
  public filteredEmployees: Employee[] = [];
  public toastController: any;
  public employee: any;
  public search=false;


  constructor(
    public employeesService: EmployeesService,
    public empRolesService: EmpRolesService,
    public usersService: UsersService,
    private modalCtrl: ModalController
  ) { }

  

  async ngOnInit() {

    this.search=false;
    this.empsLoaded=false;
      await this.initRoles();
      await this.initStaff();
      await this.initUsers();
      
    
  }

  filterByRole(role: number): Employee[] {
    let empWithRole: Employee[] = [];
    this.employees.forEach((employee) => {

      if (employee.role == role){
        empWithRole.push(employee);
      }
       
    });
    return empWithRole;
  }


  async initStaff() {
    this.employeesService.getAllEmployees().subscribe(
      (employees) => {
        this.employees = employees;
        this.empsLoaded = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async initRoles() {
    this.empRolesService.getAllEmployeeRoles().subscribe(
      (roles) => {
        this.empRoles = roles;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async initUsers() {
    this.usersService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getEmpUsername(userid: number){
    let answer;
    this.users.forEach((user) =>
    {
      if(user.id==userid){
     
        answer = user.Username;
      }
    }
    )
    return answer;
  
  }
  getEmpPassword(userid: number){
    let answer;
    this.users.forEach((user) =>
    {
      if(user.id==userid){
        answer = user.Password;
      }
    }
    )
    return answer;
  
  }

  public searchFood(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    if(searchTerm!=''){
    this.search= true;
  
    if (!searchTerm) {
      // If the search term is empty, reset the food items array
      this.filteredEmployees = this.employees;
    } else {
      // Filter the food items array based on the search term
      this.filteredEmployees = this.employees.filter((item) =>
        item.fName!+' '+item.lName!.toLowerCase().includes(searchTerm)
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
      component: ViweStaffModalComponent,
      componentProps: { mode: mode, id: id, whatToEdit: whatToEdit }
    });

    modal.onDidDismiss().then(async () => {
      await this.initRoles();
      await this.initStaff();
    });

    modal.present();

  }


  public setSort(){
    if(this.sort=='asc')
    this.sort='desc'
    else
    this.sort='asc'
  }

  public setMode(){
    if(this.mode=='role')
      this.mode='name';
    else
      this.mode='role'
  }

  public searchEmp(evt: any){
  }

 



}
