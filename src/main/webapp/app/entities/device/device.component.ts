import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDevice, ODevice } from 'app/shared/model/device.model';
import { AccountService } from 'app/core';
import { DeviceService } from './device.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-device',
  templateUrl: './device.component.html'
})
export class DeviceComponent implements OnInit {
  devices: ODevice[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected deviceService: DeviceService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    protected router: Router
  ) {}

  loadAll() {
    this.deviceService.findAllODevices().subscribe((res: HttpResponse<ODevice[]>) => {
      this.devices = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
  }

  trackId(index: number, item: IDevice) {
    return item.id;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  getDate(epoch: number): Date {
    const d = new Date(0);
    d.setUTCSeconds(epoch);
    return d;
  }

  backToHome() {
    this.router.navigateByUrl('/admin');
  }
}
