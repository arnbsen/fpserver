import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIntermdiateUser } from 'app/shared/model/intermdiate-user.model';
import { AccountService } from 'app/core';
import { IntermdiateUserService } from './intermdiate-user.service';

@Component({
  selector: 'jhi-intermdiate-user',
  templateUrl: './intermdiate-user.component.html'
})
export class IntermdiateUserComponent implements OnInit, OnDestroy {
  intermdiateUsers: IIntermdiateUser[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected intermdiateUserService: IntermdiateUserService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.intermdiateUserService
      .query()
      .pipe(
        filter((res: HttpResponse<IIntermdiateUser[]>) => res.ok),
        map((res: HttpResponse<IIntermdiateUser[]>) => res.body)
      )
      .subscribe(
        (res: IIntermdiateUser[]) => {
          this.intermdiateUsers = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInIntermdiateUsers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IIntermdiateUser) {
    return item.id;
  }

  registerChangeInIntermdiateUsers() {
    this.eventSubscriber = this.eventManager.subscribe('intermdiateUserListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
