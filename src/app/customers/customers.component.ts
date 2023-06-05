import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ScannerQRCodeSelectedFiles, NgxScannerQrcodeService, NgxScannerQrcodeComponent, ScannerQRCodeConfig, ScannerQRCodeDevice, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { delay } from 'rxjs';
import { SharedModule } from 'src/shared.module';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent  implements OnInit {

  ngOnInit(): void {
    
  }
  public config: ScannerQRCodeConfig = {
    vibrate: 400,
    // isBeep: false,
    // decode: 'macintosh',
    constraints: {
      video: {
        width: window.innerWidth 
      }
    },
  };

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];

  @ViewChild('action') action!: NgxScannerQrcodeComponent ;

  constructor(
    private qrcode: NgxScannerQrcodeService,
    private router: Router
    ) { }

  ngAfterViewInit(): void {
    this.action.isReady.pipe(delay(1000)).subscribe(() => {
      this.handle(this.action, 'start');
    });
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    e?.length && action && action.pause();
    const tableId= parseInt(e[0].value, 10);2
    localStorage.setItem('assignedTablId', tableId.toString());
   // SharedModule.assignedTablId=tableId;
    this.router.navigateByUrl('Menu')
  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: ScannerQRCodeDevice[]) => {
      // front camera or back camera check here!
      const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    }

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }


}
