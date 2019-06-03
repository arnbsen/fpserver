import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHOD } from 'app/shared/model/hod.model';
import { AccountService } from 'app/core';
import { HODService } from './hod.service';

@Component({
  selector: 'jhi-hod',
  templateUrl: './hod.component.html'
})
export class HODComponent implements OnInit, OnDestroy {
  hODS: IHOD[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected hODService: HODService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.hODService
      .query()
      .pipe(
        filter((res: HttpResponse<IHOD[]>) => res.ok),
        map((res: HttpResponse<IHOD[]>) => res.body)
      )
      .subscribe(
        (res: IHOD[]) => {
          this.hODS = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInHODS();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IHOD) {
    return item.id;
  }

  registerChangeInHODS() {
    this.eventSubscriber = this.eventManager.subscribe('hODListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
