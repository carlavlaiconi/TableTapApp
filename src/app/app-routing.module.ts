import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { StaffComponent } from './staff/staff.component';
import { TabsPage } from './tabs/tabs.page';
import { TabsPageModule } from './tabs/tabs.module';
import { MenuComponent } from './menu/menu.component';
import { AdminComponent } from './staff/admin/admin.component';
import { EditFoodMenuComponent } from './staff/admin/edit-food-menu/edit-food-menu.component';
import { EditDrinksMenuComponent } from './staff/admin/edit-drinks-menu/edit-drinks-menu.component';
import { EditStaffComponent } from './staff/admin/edit-staff/edit-staff.component';
import { AdminDefaultComponent } from './staff/admin/admin-default/admin-default.component';
import { StaffDefaultComponent } from './staff/staff-default/staff-default.component';
import { ListTablesStackComponent } from './staff/list-tables-stack/list-tables-stack.component';
import { ListTablesComponent } from './staff/list-tables/list-tables.component';
import { ViewStaffComponent } from './staff/admin/edit-staff/view-staff/view-staff.component';
import { ViewOrdersComponent } from './staff/admin/edit-staff/view-orders/view-orders.component';
import { ViewTablesComponent } from './staff/admin/edit-staff/view-tables/view-tables.component';
import { DrinkMenuComponent } from './menu/drink-menu/drink-menu.component';
import { FoodMenuComponent } from './menu/food-menu/food-menu.component';
import { CartComponent } from './menu/cart/cart.component';
import { LogInComponent } from './log-in/log-in.component';
import { CustomersComponent } from './customers/customers.component';


const routes: Routes = [
  {
    path: '',
    component: StartPageComponent
  },
  {
    path: 'Staff',
    component: StaffComponent,
    children:[
      {
        path: '',
        component: ListTablesComponent
      },
      {
        path: 'ListStack',
        component: ListTablesStackComponent
      },
      {
        path: 'ListTables',
        component: ListTablesComponent
      },
      
    ]
    
  },
  {
    path: 'Admin',
    component: AdminComponent,
    children:[
      {
        path: '',
        component: EditFoodMenuComponent
      },
      {
        path: 'EditFoodMenu',
        component: EditFoodMenuComponent
      },
      {
        path: 'EditDrinksMenu',
        component: EditDrinksMenuComponent
      },
      {
        path: 'EditStaff',
        component: EditStaffComponent
      },
      {
        path: 'ViewTables',
        component: ViewTablesComponent
      },
      {
        path: 'ViewOrders',
        component: ViewOrdersComponent
      },
      {
        path: 'ViewStaff',
        component: ViewStaffComponent
      }
    ]
  },
  {
    path: 'scanQR',
    component: CustomersComponent
  },
  {
    path: 'Menu',
    component: MenuComponent,
    children:[
      {
        path: '',
        component: FoodMenuComponent
      },
      {
        path: 'FoodMenu',
        component: FoodMenuComponent
      },
      {
        path: 'DrinkMenu',
        component: DrinkMenuComponent
      },
      {
        path: 'Cart',
        component: CartComponent
      }
    ]
  },
  {
    path: 'LogIn',
    component: LogInComponent,
  }
  
  // {
  //   path: 'Tabs',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
