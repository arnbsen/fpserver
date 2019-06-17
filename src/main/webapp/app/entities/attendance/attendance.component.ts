import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAttendance } from 'app/shared/model/attendance.model';
import { AccountService } from 'app/core';
import { AttendanceService } from './attendance.service';

@Component({
  selector: 'jhi-attendance',
  templateUrl: './attendance.component.html'
})
export class AttendanceComponent implements OnInit, OnDestroy {
  attendances: IAttendance[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected attendanceService: AttendanceService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.attendanceService
      .query()
      .pipe(
        filter((res: HttpResponse<IAttendance[]>) => res.ok),
        map((res: HttpResponse<IAttendance[]>) => res.body)
      )
      .subscribe(
        (res: IAttendance[]) => {
          this.attendances = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }
  loadByDeviceID(deviceID = 'STCS644') {
    this.attendanceService
      .getAllByDeviceID(deviceID)
      .pipe(
        filter((res: HttpResponse<IAttendance[]>) => res.ok),
        map((res: HttpResponse<IAttendance[]>) => res.body)
      )
      .subscribe(
        (res: IAttendance[]) => {
          console.log(res);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.loadByDeviceID();
    this.registerChangeInAttendances();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAttendance) {
    return item.id;
  }

  registerChangeInAttendances() {
    this.eventSubscriber = this.eventManager.subscribe('attendanceListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
