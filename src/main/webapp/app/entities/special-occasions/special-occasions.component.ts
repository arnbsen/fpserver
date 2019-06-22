import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { ISpecialOccasions, DayType } from 'app/shared/model/special-occasions.model';
import { AccountService } from 'app/core';
import { SpecialOccasionsService } from './special-occasions.service';
import { CalendarEvent, EventColor } from 'calendar-utils';
import { CalendarView, DateAdapter } from 'angular-calendar';
import { AcademicSessionService } from '../academic-session';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { IAcademicSession } from 'app/shared/model/academic-session.model';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatSnackBar } from '@angular/material';
import { MY_FORMATS2 } from '../creator/dashboard/dashboard.component';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
export function momentAdapterFactory() {
  return adapterFactory(moment);
}
@Component({
  selector: 'jhi-special-occasions',
  templateUrl: './special-occasions.component.html',
  providers: [
    { provide: DateAdapter, deps: [MAT_DATE_LOCALE], useFactory: momentAdapterFactory },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS2 }
  ]
})
export class SpecialOccasionsComponent implements OnInit, OnDestroy {
  specialOccasions: ISpecialOccasions[];
  academicSession: IAcademicSession;
  currentAccount: any;
  eventSubscriber: Subscription;
  exam: EventColor = {
    primary: '#9b59b6',
    secondary: '#9b59b6'
  };
  collegeOnly: EventColor = {
    primary: '#e67e22',
    secondary: '#e67e22'
  };
  holiday: EventColor = {
    primary: '#3498db',
    secondary: '#3498db'
  };
  activeDayIsOpen = false;
  refresh: Subject<any> = new Subject();
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  specialOccassionsForm: FormGroup;

  colourLookup = {};

  editMode = true;

  constructor(
    protected academicSessionService: AcademicSessionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    protected specialOccasionsService: SpecialOccasionsService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    private _snackBar: MatSnackBar
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
          this.loadView();
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.colourLookup[DayType.COLLEGEONLY] = this.collegeOnly;
    this.colourLookup[DayType.EXAM] = this.exam;
    this.colourLookup[DayType.HOLIDAY] = this.holiday;
    this.activatedRoute.data.subscribe(({ academicSession }) => {
      this.academicSession = academicSession;
    });
    this.academicSessionService.findNow().subscribe((data: HttpResponse<any>) => {});
    this.registerChangeInSpecialOccasions();
  }

  // Form Specific

  createForm() {
    this.specialOccassionsForm = this.fb.group({
      startDate: [moment(), Validators.required],
      endDate: [moment(), Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      academicSessionId: []
    });
  }

  onSubmit() {
    if (this.specialOccassionsForm.get('startDate').value > this.specialOccassionsForm.get('endDate').value) {
      this.openSnackBar('Error: Start Date must be before or Equal to End Date', 'Done');
      return;
    } else {
      let saveObject: ISpecialOccasions;
      if (!this.editMode) {
        saveObject = {
          academicSessionId: this.academicSession.id,
          description: this.specialOccassionsForm.get('description').value,
          startDate: this.specialOccassionsForm.get('startDate').value,
          endDate: this.specialOccassionsForm.get('endDate').value,
          type: this.specialOccassionsForm.get('type').value
        };
        this.specialOccasionsService.create(saveObject).subscribe(
          (res: HttpResponse<ISpecialOccasions>) => {
            this.specialOccassionsForm = null;
            this.openSnackBar('Event Created', 'Done');
            this.loadAll();
          },
          err => this.openSnackBar('Error Occured. Try Again', 'Done')
        );
      } else {
        saveObject = {
          id: this.specialOccassionsForm.get('id').value,
          academicSessionId: this.academicSession.id,
          description: this.specialOccassionsForm.get('description').value,
          startDate: this.specialOccassionsForm.get('startDate').value,
          endDate: this.specialOccassionsForm.get('endDate').value,
          type: this.specialOccassionsForm.get('type').value
        };
        this.specialOccasionsService.update(saveObject).subscribe(
          (res: HttpResponse<ISpecialOccasions>) => {
            this.specialOccassionsForm = null;
            this.openSnackBar('Event Updated', 'Done');
            this.loadAll();
          },
          err => this.openSnackBar('Error Occured. Try Again', 'Done')
        );
      }
      this.editMode = false;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
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

  deleteEvent() {
    const id = this.specialOccassionsForm.get('id').value;
    this.specialOccasionsService.delete(id).subscribe(
      (res: HttpResponse<any>) => {
        this.openSnackBar('Event Deleted', 'Done');
        this.editMode = false;
        this.loadAll();
        this.specialOccassionsForm = null;
      },
      err => this.openSnackBar('Error Occured. Try Again', 'Done')
    );
  }
  // Calender Configs
  loadView() {
    this.events = [];
    this.specialOccasions.forEach((val: ISpecialOccasions) => {
      if (val.startDate === val.endDate) {
        this.events.push({
          title: val.description,
          start: startOfDay(val.startDate.toDate()),
          end: endOfDay(val.endDate.toDate()),
          allDay: true,
          meta: val,
          color: this.colourLookup[val.type]
        });
      } else {
        this.events.push({
          title: val.description,
          start: startOfDay(val.startDate.toDate()),
          end: endOfDay(val.endDate.toDate()),
          meta: val,
          allDay: false,
          color: this.colourLookup[val.type]
        });
      }
    });
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    const specialOccasions: ISpecialOccasions = event.meta as ISpecialOccasions;
    this.specialOccassionsForm = this.fb.group({
      id: specialOccasions.id,
      startDate: [specialOccasions.startDate, Validators.required],
      endDate: [specialOccasions.endDate, Validators.required],
      type: [specialOccasions.type, Validators.required],
      description: [specialOccasions.description, Validators.required],
      academicSessionId: [specialOccasions.academicSessionId]
    });
    this.editMode = true;
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
