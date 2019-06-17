import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFaculty } from 'app/shared/model/faculty.model';
import { AccountService, Account } from 'app/core';
import { FacultyService } from './faculty.service';

@Component({
  selector: 'jhi-faculty',
  templateUrl: './faculty.component.html'
})
export class FacultyComponent implements OnInit, OnDestroy {
  faculties: IFaculty[];
  faculty: IFaculty;
  currentAccount: Account;
  eventSubscriber: Subscription;

  constructor(
    protected facultyService: FacultyService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.facultyService
      .query()
      .pipe(
        filter((res: HttpResponse<IFaculty[]>) => res.ok),
        map((res: HttpResponse<IFaculty[]>) => res.body)
      )
      .subscribe(
        (res: IFaculty[]) => {
          this.faculties = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    // this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
      this.facultyService.findbyDeviceID(this.currentAccount.id).subscribe((res: HttpResponse<IFaculty>) => {
        console.log(res.body);
      });
    });
    this.registerChangeInFaculties();
  }
  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFaculty) {
    return item.id;
  }

  registerChangeInFaculties() {
    this.eventSubscriber = this.eventManager.subscribe('facultyListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
