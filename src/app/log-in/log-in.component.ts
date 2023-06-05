import { Component, OnInit } from '@angular/core';
import { skeyService } from '../services/skey.service';
import { UsersService } from '../services/users.service';
import { EmpRolesService } from '../services/empRoles.service';


import { Md5 } from 'ts-md5';


import { Users } from 'src/models/users.model';
import { Employee } from 'src/models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

export interface skey {
  skey?: string;
}

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
 
  private users: Users[] = [];
  public logInUser: Users = {};


  loginForm: FormGroup;

  constructor(
    private skeyService: skeyService,
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder,
    private toastController: ToastController
  ) { 

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async ngOnInit() {
 
    await this.initData();
  }

  async initData(){

    this.usersService.getAllUsers().subscribe( (users) =>{
      this.users=users;
    } )
  }

  async login(): Promise<void> {  
    const md5 = new Md5();
    const encPass = md5.appendStr(this.logInUser.Password!).end();
  
    let userFound = false;
  
    this.users.forEach(async (user) => {
      if (user.Username == this.logInUser.Username) {
        userFound = true;
  
        if (encPass == user.Password) {
          const toast = await this.toastController.create({
            message: 'Login Successful!',
            duration: 2000,
            position: 'bottom'
          });
  
          toast.present();

          localStorage.setItem('userId', user.id!.toString())
  
          if (user.isAdmin == 0) {
            this.router.navigateByUrl('Staff');
            localStorage.setItem('isWaiter', '1')
          } else {
            this.router.navigateByUrl('Admin');
          }
        } else {
          const toast = await this.toastController.create({
            message: 'Login Failed! Check Password',
            duration: 2000,
            position: 'bottom'
          });
  
          toast.present();
        }
      }
    });
  
    if (!userFound) {
      const toast = await this.toastController.create({
        message: 'Login Failed! Check Username',
        duration: 2000,
        position: 'bottom'
      });
  
      toast.present();
    }
  }
  
}
