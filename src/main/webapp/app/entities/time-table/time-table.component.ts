import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITimeTable, OTimeTable } from 'app/shared/model/time-table.model';
import { AccountService } from 'app/core';
import { TimeTableService } from './time-table.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import { IDepartment } from 'app/shared/model/department.model';
import { ODayTimeTable, DayType, DayOfWeek } from 'app/shared/model/day-time-table.model';
import { OSubjectTimeTable, ISubjectTimeTable } from 'app/shared/model/subject-time-table.model';
import { ISubject } from 'app/shared/model/subject.model';
import { IFaculty } from 'app/shared/model/faculty.model';
import { isString } from 'util';

@Component({
  selector: 'jhi-time-table',
  templateUrl: './time-table.component.html'
})
export class TimeTableComponent implements OnInit, OnDestroy {
  timeTable: ITimeTable = {};
  displayTable: OTimeTable;
  currentAccount: any;
  eventSubscriber: Subscription;
  department: IDepartment;
  weekTimeTable = {};
  enableTable = false;
  noData = false;
  topRow = [
    { span: 7, header: 'Day' },
    { span: 12, header: '9:30 AM - 10:25 AM' },
    { span: 12, header: '10:25 AM - 11:20 AM' },
    { span: 12, header: '11:35 AM - 12: 30 PM' },
    { span: 12, header: '12:30 PM - 1:25 PM' },
    { span: 9, header: '1:25 PM - 2:00PM' },
    { span: 12, header: '2:45 PM - 3:40 PM' },
    { span: 12, header: '3:40 PM - 4:35 PM' },
    { span: 12, header: '4:35 PM - 5:30 PM' }
  ];
  spanMeasure = {
    HOLIDAY: 100,
    REGULAR: 12,
    TUTORIAL: 9,
    LAB: 36
  };
  daysOfWeek = [
    DayOfWeek.SUNDAY,
    DayOfWeek.MONDAY,
    DayOfWeek.TUESDAY,
    DayOfWeek.WEDNESDAY,
    DayOfWeek.THRUSDAY,
    DayOfWeek.FRIDAY,
    DayOfWeek.SATURDAY
  ];
  constructor(
    protected timeTableService: TimeTableService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.activatedRoute.data.subscribe(({ department }) => {
      this.department = department;
      this.timeTable.departmentId = this.department.id;
      this.activatedRoute.params.subscribe((val: Params) => {
        this.timeTable.semester = val.sem;
        this.timeTable.year = val.year;
        this.getTimeTable();
      });
    });
    // console.log(this.activatedRoute.params['year']);
  }

  getTimeTable() {
    // this.loaderStart = true;
    this.timeTableService.findByYearSemDept(this.timeTable).subscribe(
      (res: HttpResponse<OTimeTable>) => {
        this.displayTable = res.body;
        this.displayTable.dayTimeTables.forEach((val: ODayTimeTable) => {
          val.subjects.sort(this.compareSubjectsByTime);
          this.weekTimeTable[val.dayOfWeek] = {};
          this.weekTimeTable[val.dayOfWeek].id = val.id;
          this.weekTimeTable[val.dayOfWeek].subjectsList = this.createSubjectList(val);
          this.weekTimeTable[val.dayOfWeek].spanCount = 100;
          this.weekTimeTable[val.dayOfWeek].lastTime = 63900000;
          this.weekTimeTable[val.dayOfWeek].disableAdd = true;
        });
        this.enableTable = true;
      },
      (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.noData = true;
        }
      }
    );
  }
  createSubjectList(from: ODayTimeTable) {
    let list = [];
    let lastIndex = -1;
    if (from.dayType === DayType.WORKINGALL) {
      from.subjects.forEach((val: OSubjectTimeTable) => {
        if (lastIndex === -1) {
          list = [
            {
              subjects: [{ id: val.id, subject: val.subject, location: val.location, type: val.classType }],
              span: this.spanMeasure[val.classType],
              startTime: val.startTime,
              endTime: val.endTime
            }
          ];
          lastIndex = 0;
        } else {
          if (list[lastIndex].startTime === val.startTime) {
            list[lastIndex].subjects.push({
              id: val.id,
              subject: val.subject,
              location: val.location,
              type: val.classType
            });
          } else {
            list.push({
              subjects: [
                {
                  id: val.id,
                  subject: val.subject,
                  location: val.location,
                  type: val.classType
                }
              ],
              span: this.spanMeasure[val.classType],
              startTime: val.startTime,
              endTime: val.endTime
            });
            lastIndex += 1;
          }
        }
      });
    } else {
      list = [
        {
          subjects: ['HOLIDAY'],
          span: 100,
          startTime: 34200000,
          endTime: 63000000
        }
      ];
    }
    return list;
  }

  compareSubjectsByTime(a: ISubjectTimeTable, b: ISubjectTimeTable): number {
    if (a.startTime < b.startTime) {
      return -1;
    }
    if (a.startTime > b.startTime) {
      return 1;
    }
    return 0;
  }

  createParagraph(sub: ISubject | any) {
    let fac = '';
    if (sub.faculty) {
      sub.faculty.forEach((facu: IFaculty) => {
        fac += facu.facultyCode + ', ';
      });
    } else {
      sub.faculties.forEach((facu: IFaculty) => {
        fac += facu.facultyCode + ', ';
      });
    }
    return '  ' + sub.subjectName + ' ' + fac.substr(0, fac.length - 2);
  }

  checkForString(val: any) {
    return isString(val);
  }

  trackId(index: number, item: ITimeTable) {
    return item.id;
  }
  ngOnDestroy() {}
}
