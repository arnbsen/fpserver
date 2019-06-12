import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISpecialOccasions } from 'app/shared/model/special-occasions.model';
import { AccountService } from 'app/core';
import { SpecialOccasionsService } from './special-occasions.service';

@Component({
  selector: 'jhi-special-occasions',
  templateUrl: './special-occasions.component.html'
})
export class SpecialOccasionsComponent implements OnInit, OnDestroy {
  specialOccasions: ISpecialOccasions[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected specialOccasionsService: SpecialOccasionsService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.specialOccasionsService
      .query()
      .pipe(
        filter((res: HttpResponse<ISpecialOccasions[]>) => res.ok),
        map((res: HttpResponse<ISpecialOccasions[]>) => res.body)
      )
      .subscribe(
        (res: ISpecialOccasions[]) => {
          this.specialOccasions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSpecialOccasions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISpecialOccasions) {
    return item.id;
  }

  registerChangeInSpecialOccasions() {
    this.eventSubscriber = this.eventManager.subscribe('specialOccasionsListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
