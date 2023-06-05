import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { StaffComponent } from './staff/staff.component';
import { MenuComponent } from './menu/menu.component';
import { EditDrinksMenuComponent } from './staff/admin/edit-drinks-menu/edit-drinks-menu.component';
import { EditFoodMenuComponent } from './staff/admin/edit-food-menu/edit-food-menu.component';
import { EditStaffComponent } from './staff/admin/edit-staff/edit-staff.component';
import { AdminComponent } from './staff/admin/admin.component';

import { HttpClientModule } from '@angular/common/http'
import { FoodModalComponent } from './staff/admin/edit-food-menu/food-modal/food-modal.component';

import { FormsModule } from '@angular/forms'; // import the FormsModule
import { ListTablesComponent } from './staff/list-tables/list-tables.component';
import { ListTablesStackComponent } from './staff/list-tables-stack/list-tables-stack.component';
import { StaffDefaultComponent } from './staff/staff-default/staff-default.component';
import { ViewTablesComponent } from './staff/admin/edit-staff/view-tables/view-tables.component';
import { ViewOrdersComponent } from './staff/admin/edit-staff/view-orders/view-orders.component';
import { ViewStaffComponent } from './staff/admin/edit-staff/view-staff/view-staff.component';
import { DrinksModalComponent } from './staff/admin/edit-drinks-menu/drinks-modal/drinks-modal.component';
import { CustomersComponent } from './customers/customers.component';
import { FoodMenuComponent } from './menu/food-menu/food-menu.component';
import { DrinkMenuComponent } from './menu/drink-menu/drink-menu.component';
import { CartComponent } from './menu/cart/cart.component';
import { LogInComponent } from './log-in/log-in.component';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { ViewTablesModalComponent } from './staff/admin/edit-staff/view-tables/view-tables-modal/view-tables-modal.component';
import { ViweStaffModalComponent } from './staff/admin/edit-staff/view-staff/viwe-staff-modal/viwe-staff-modal.component';
import { OrdersModalComponent } from './staff/orders-modal/orders-modal.component';






@NgModule({
  declarations: [AppComponent, StartPageComponent, StaffComponent, MenuComponent, EditFoodMenuComponent, EditStaffComponent, AdminComponent, FoodModalComponent, EditDrinksMenuComponent, ListTablesComponent, ListTablesStackComponent, StaffDefaultComponent, ViewTablesComponent, ViewOrdersComponent, ViewStaffComponent, DrinksModalComponent, CustomersComponent, FoodMenuComponent, DrinkMenuComponent, CartComponent, LogInComponent, ViewTablesModalComponent, ViweStaffModalComponent, OrdersModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, RouterModule, HttpClientModule, FormsModule, ZXingScannerModule, NgxScannerQrcodeModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
