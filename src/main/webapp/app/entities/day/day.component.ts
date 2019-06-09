import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDay } from 'app/shared/model/day.model';
import { AccountService } from 'app/core';
import { DayService } from './day.service';

@Component({
  selector: 'jhi-day',
  templateUrl: './day.component.html'
})
export class DayComponent implements OnInit, OnDestroy {
  days: IDay[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected dayService: DayService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.dayService
      .query()
      .pipe(
        filter((res: HttpResponse<IDay[]>) => res.ok),
        map((res: HttpResponse<IDay[]>) => res.body)
      )
      .subscribe(
        (res: IDay[]) => {
          this.days = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDays();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDay) {
    return item.id;
  }

  registerChangeInDays() {
    this.eventSubscriber = this.eventManager.subscribe('dayListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
