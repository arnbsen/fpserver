import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDayTimeTable } from 'app/shared/model/day-time-table.model';
import { AccountService } from 'app/core';
import { DayTimeTableService } from './day-time-table.service';

@Component({
  selector: 'jhi-day-time-table',
  templateUrl: './day-time-table.component.html'
})
export class DayTimeTableComponent implements OnInit, OnDestroy {
  dayTimeTables: IDayTimeTable[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected dayTimeTableService: DayTimeTableService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.dayTimeTableService
      .query()
      .pipe(
        filter((res: HttpResponse<IDayTimeTable[]>) => res.ok),
        map((res: HttpResponse<IDayTimeTable[]>) => res.body)
      )
      .subscribe(
        (res: IDayTimeTable[]) => {
          this.dayTimeTables = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDayTimeTables();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDayTimeTable) {
    return item.id;
  }

  registerChangeInDayTimeTables() {
    this.eventSubscriber = this.eventManager.subscribe('dayTimeTableListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
