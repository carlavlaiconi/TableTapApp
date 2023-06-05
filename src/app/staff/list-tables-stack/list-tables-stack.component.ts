import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TablesService } from 'src/app/services/tables.service';
import { TablesStatService } from 'src/app/services/tablesStat.service';
import { TablesModel } from 'src/models/tables.model';
import { TablesStatusModel } from 'src/models/tablesStatus.model';
import { OrdersModalComponent } from '../orders-modal/orders-modal.component';

@Component({
  selector: 'app-list-tables-stack',
  templateUrl: './list-tables-stack.component.html',
  styleUrls: ['./list-tables-stack.component.scss'],
})
export class ListTablesStackComponent  implements OnInit {

  public tables: TablesModel[] =[];
  public tablesStats: TablesStatusModel[] = [];
  public tablesLoaded: boolean = false;

  constructor(
    public tablesService: TablesService,
    public tablesStatsService: TablesStatService,
    public modalCtrl: ModalController
  ) { }

  async ngOnInit() {

    this.tablesLoaded=false;
    await this.initTablesStats();
    await this.inittables();
    
  }

  async openModal(table: TablesModel){
    const modal = await this.modalCtrl.create({
      component: OrdersModalComponent,
      componentProps: { table: table }
    });

    modal.onDidDismiss().then(async () => {
      await this.initTablesStats();
      await this.inittables();
    });

    modal.present();

  }


  getStatusName(tableStatus: number): string {
    
    for(let i=0; i<this.tablesStats.length; i++)
      if(this.tablesStats[i].id == tableStatus)
        return this.tablesStats[i].name!;

    return 'null'
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

  async initTablesStats() {
    this.tablesStatsService.getAllTablesStatus().subscribe(
      (stats) => {
        this.tablesStats = stats;

      },
      (error) => {
        console.error(error);
      }
    );
  }



}
