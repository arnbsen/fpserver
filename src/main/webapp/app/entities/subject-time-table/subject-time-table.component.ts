import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISubjectTimeTable } from 'app/shared/model/subject-time-table.model';
import { AccountService } from 'app/core';
import { SubjectTimeTableService } from './subject-time-table.service';

@Component({
  selector: 'jhi-subject-time-table',
  templateUrl: './subject-time-table.component.html'
})
export class SubjectTimeTableComponent implements OnInit, OnDestroy {
  subjectTimeTables: ISubjectTimeTable[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected subjectTimeTableService: SubjectTimeTableService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.subjectTimeTableService
      .query()
      .pipe(
        filter((res: HttpResponse<ISubjectTimeTable[]>) => res.ok),
        map((res: HttpResponse<ISubjectTimeTable[]>) => res.body)
      )
      .subscribe(
        (res: ISubjectTimeTable[]) => {
          this.subjectTimeTables = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSubjectTimeTables();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISubjectTimeTable) {
    return item.id;
  }

  registerChangeInSubjectTimeTables() {
    this.eventSubscriber = this.eventManager.subscribe('subjectTimeTableListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
