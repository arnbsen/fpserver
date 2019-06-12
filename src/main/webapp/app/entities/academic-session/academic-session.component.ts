import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAcademicSession } from 'app/shared/model/academic-session.model';
import { AccountService } from 'app/core';
import { AcademicSessionService } from './academic-session.service';

@Component({
  selector: 'jhi-academic-session',
  templateUrl: './academic-session.component.html'
})
export class AcademicSessionComponent implements OnInit, OnDestroy {
  academicSessions: IAcademicSession[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected academicSessionService: AcademicSessionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.academicSessionService
      .query()
      .pipe(
        filter((res: HttpResponse<IAcademicSession[]>) => res.ok),
        map((res: HttpResponse<IAcademicSession[]>) => res.body)
      )
      .subscribe(
        (res: IAcademicSession[]) => {
          this.academicSessions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAcademicSessions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAcademicSession) {
    return item.id;
  }

  registerChangeInAcademicSessions() {
    this.eventSubscriber = this.eventManager.subscribe('academicSessionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
