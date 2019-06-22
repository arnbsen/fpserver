import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { ISpecialOccasions } from 'app/shared/model/special-occasions.model';
import { CalendarEvent, EventColor } from 'calendar-utils';
import { Subject } from 'rxjs';
import { CalendarView, DateAdapter } from 'angular-calendar';
import { SpecialOccasionsService } from './special-occasions.service';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import * as moment from 'moment';
import { AcademicSessionService } from '../academic-session';
import { IAcademicSession } from 'app/shared/model/academic-session.model';
import { MY_FORMATS2 } from '../creator/dashboard/dashboard.component';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { momentAdapterFactory } from './special-occasions.component';
@Component({
  selector: 'jhi-special-occasions-detail',
  templateUrl: './special-occasions-detail.component.html',
  providers: [
    { provide: DateAdapter, deps: [MAT_DATE_LOCALE], useFactory: momentAdapterFactory },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS2 }
  ]
})
export class SpecialOccasionsDetailComponent implements OnInit {
  specialOccasions: ISpecialOccasions[];
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

  colourLookup = {};

  editMode = true;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected specialOccasionsService: SpecialOccasionsService,
    protected academicSessionService: AcademicSessionService
  ) {}

  ngOnInit() {
    this.academicSessionService.findNow().subscribe((resas: HttpResponse<IAcademicSession>) => {
      this.specialOccasionsService
        .findbyAcademicSession(resas.body.id)
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
    });
  }

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

  previousState() {
    window.history.back();
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

  protected onError(errorMessage: string) {}
}
