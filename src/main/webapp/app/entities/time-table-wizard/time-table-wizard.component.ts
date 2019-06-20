import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ITimeTable, OTimeTable } from 'app/shared/model/time-table.model';
import { ActivatedRoute } from '@angular/router';
import { IDepartment } from 'app/shared/model/department.model';
import { TimeTableMetaDataDialogComponent } from './time-table-wizard.metadata';
import { SubjectTimeTableService } from '../subject-time-table';
import { DayTimeTableService } from '../day-time-table';
import { TimeTableService } from '../time-table/time-table.service';
import { ISubjectTimeTable, ClassType, OSubjectTimeTable } from 'app/shared/model/subject-time-table.model';
import { ISubject, Subject } from 'app/shared/model/subject.model';
import { Time } from '@angular/common';
import { isString } from 'util';
import { SubjectService } from '../subject';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { SubjectChooserDialogComponent } from './subject.chooser.dialog.component';
import { IFaculty } from 'app/shared/model/faculty.model';
import { anyTypeAnnotation } from '@babel/types';
import { ILocation, Location } from 'app/shared/model/location.model';
import { LocationService } from '../location';
import { DayOfWeek, DayType, ODayTimeTable } from 'app/shared/model/day-time-table.model';
import { IDayTimeTable } from 'app/shared/model/day-time-table.model';

export interface DialogData {
  year: number;
  semester: number;
}
export interface SubjectTimeTableData {
  subjectsList?: [
    {
      subjects:
        | [
            {
              subject?: ISubject;
              location?: ILocation;
              type?: string;
            }
          ]
        | string[];
      span?: number;
      startTime?: number;
      endTime?: number;
    }
  ];
  lastTime?: number;
  spanCount?: number;
}
@Component({
  selector: 'jhi-time-table-wizard',
  templateUrl: './time-table-wizard.component.html',
  styles: []
})
export class TimeTableWizardComponent implements OnInit {
  daysOfWeek = [
    DayOfWeek.SUNDAY,
    DayOfWeek.MONDAY,
    DayOfWeek.TUESDAY,
    DayOfWeek.WEDNESDAY,
    DayOfWeek.THRUSDAY,
    DayOfWeek.FRIDAY,
    DayOfWeek.SATURDAY
  ];
  holiday = [];
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

  timeTable: ITimeTable = {};
  department: IDepartment;
  hasChoosenOptions = false;
  disableLab = false;
  displayTable: OTimeTable;
  disableHoliday = false;
  wizardData: DialogData;
  choosenDay: string;
  subjects: ISubject[];
  weekTimeTable = {};
  weekTimeRet = {};
  locations: ILocation[];
  saveMessage: string;
  enableEdit = false;

  constructor(
    public dialog: MatDialog,
    protected activatedRoute: ActivatedRoute,
    protected subjectTimeTableService: SubjectTimeTableService,
    protected daytimeTableService: DayTimeTableService,
    protected timeTableService: TimeTableService,
    protected subjectService: SubjectService,
    protected locationService: LocationService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.department = department;
      this.timeTable.departmentId = this.department.id;
      this.loadAllSubjects();
      this.loadAllLocations();
      this.getTimeTable();
    });
  }

  loadAllSubjects() {
    this.subjectService
      .query()
      .pipe(
        filter((res: HttpResponse<ISubject[]>) => res.ok),
        map((res: HttpResponse<ISubject[]>) => res.body)
      )
      .subscribe(
        (res: ISubject[]) => {
          this.subjects = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }
  onError(message: string): void {
    throw new Error('Method not implemented.');
  }

  getTimeTable() {
    this.timeTableService.findOrg('5d0b4ae9502a750004962c49').subscribe((res: HttpResponse<OTimeTable>) => {
      this.displayTable = res.body;
      console.log(this.displayTable);
      this.displayTable.dayTimeTables.forEach((val: ODayTimeTable) => {
        val.subjects.sort(this.compareSubjectsByTime);
        this.weekTimeRet[val.dayOfWeek] = {};
        this.weekTimeRet[val.dayOfWeek].subjectsList = this.createSubjectList(val);
        this.weekTimeRet[val.dayOfWeek].spanCount = 100;
        this.weekTimeRet[val.dayOfWeek].lastTime = 63900000;
        this.weekTimeRet[val.dayOfWeek].disableAdd = true;
      });
      console.log(this.weekTimeRet);
    });
  }

  createSubjectList(from: ODayTimeTable) {
    let list = [];
    let lastIndex = -1;
    if (from.dayType === DayType.WORKINGALL) {
      from.subjects.forEach((val: OSubjectTimeTable) => {
        if (lastIndex === -1) {
          list = [
            {
              subjects: [{ subject: val.subject, location: val.location, type: val.classType }],
              span: this.spanMeasure[val.classType],
              startTime: val.startTime,
              endTime: val.endTime
            }
          ];
          lastIndex = 0;
        } else {
          if (list[lastIndex].startTime === val.startTime) {
            list[lastIndex].subjects.push({
              subject: val.subject,
              location: val.location,
              type: val.classType
            });
          } else {
            list.push({
              subjects: [
                {
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

  openDialog() {
    const dialogRef = this.dialog.open(TimeTableMetaDataDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null) {
        this.hasChoosenOptions = true;
        this.wizardData = result;
        this.daysOfWeek.forEach(day => {
          this.weekTimeTable[day] = {
            subjectsList: [],
            lastTime: 9 * 60 * 60 * 1000 + 30 * 60 * 1000,
            disableAdd: false,
            spanCount: 7
          };
        });
        this.subjects = this.subjects.filter(
          (val: ISubject) =>
            val.semester === this.wizardData.semester && val.year === this.wizardData.year && val.ofDeptId === this.department.id
        );
      }
    });
  }

  loadAllLocations() {
    this.locationService
      .query()
      .pipe(
        filter((res: HttpResponse<ILocation[]>) => res.ok),
        map((res: HttpResponse<ILocation[]>) => res.body)
      )
      .subscribe(
        (res: ILocation[]) => {
          this.locations = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  chooseCurrentDay(day: string) {
    this.choosenDay = day;
    this.disableLabFn();
    // console.log(this.weekTimeTable[day]);
  }
  declareHoliday() {
    this.weekTimeTable[this.choosenDay].subjectsList = [];
    this.weekTimeTable[this.choosenDay].subjectsList.push({
      subjects: ['HOLIDAY'],
      span: 100
    });
    this.weekTimeTable[this.choosenDay].spanCount = 100;
    this.weekTimeTable[this.choosenDay].disableAdd = true;
    // console.log(this.weekTimeTable);
  }

  checkForString(val: any) {
    return isString(val);
  }

  openSubjectChooser(type: string, subArray: [{ subject: ISubject; location: ILocation; type: string }] = null) {
    const dialogRef = this.dialog.open(SubjectChooserDialogComponent, {
      data: [this.subjects, this.locations]
    });
    type = this.weekTimeTable[this.choosenDay].spanCount === 55 ? 'TUTORIAL' : type;
    // console.log(this.weekTimeTable[this.choosenDay].spanCount);

    const spanWidth = this.spanMeasure[type];
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!subArray) {
          this.weekTimeTable[this.choosenDay].subjectsList.push({
            subjects: [
              {
                subject: new Subject(
                  result[0].id,
                  result[0].subjectCode,
                  result[0].subjectName,
                  result[0].year,
                  result[0].semester,
                  result[0].ofDeptId,
                  result[0].faculty
                ),
                location: new Location(result[1].id, result[1].locationName),
                type
              }
            ],
            span: spanWidth,
            startTime: this.weekTimeTable[this.choosenDay].lastTime + 1,
            endTime: this.weekTimeTable[this.choosenDay].lastTime +=
              type === 'TUTORIAL' ? 35 * 60 * 1000 : type === 'REGULAR' ? 55 * 60 * 1000 : 3 * 60 * 60 * 1000
          });
          this.weekTimeTable[this.choosenDay].spanCount += spanWidth;
          // console.log(this.weekTimeTable[this.choosenDay].spanCount);
          this.weekTimeTable[this.choosenDay].lastTime += this.weekTimeTable[this.choosenDay].spanCount === 31 ? 15 * 60 * 1000 : 0;
          this.weekTimeTable[this.choosenDay].lastTime += type === 'TUTORIAL' ? 45 * 60 * 1000 : 0;
          this.weekTimeTable[this.choosenDay].disableAdd = this.weekTimeTable[this.choosenDay].spanCount === 100;
        } else {
          subArray.push({
            subject: new Subject(
              result[0].id,
              result[0].subjectCode,
              result[0].subjectName,
              result[0].year,
              result[0].semester,
              result[0].ofDeptId,
              result[0].faculty
            ),
            location: new Location(result[1].id, result[1].locationName),
            type: subArray[0].type
          });
        }
        this.disableLabFn();
      }
    });
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

  removeSubject(data: any, subjects: ISubject[]) {
    // console.log(this.weekTimeTable);
    subjects.pop();

    // console.log(this.weekTimeTable[this.choosenDay]);
    // console.log(data);
    if (subjects.length === 0 && data.subjectsList.length === 1) {
      data.subjectsList = [];
      data.lastTime = 9 * 60 * 60 * 1000 + 30 * 60 * 1000;
      data.disableAdd = false;
      data.spanCount = 7;
    }
    if (subjects.length === 0 && data.subjectsList.length > 1) {
      const param = data.subjectsList.pop();
      const index = data.subjectsList.length - 1;
      // console.log(param);
      data.lastTime = param.endTime - param.startTime + 1;
      data.spanCount -= param.span;
      data.disableAdd = false;
    }
    this.disableLabFn();
  }

  saveData() {
    console.log(this.weekTimeTable);
    this.saveMessage = 'Validating';
    let allOk = true;
    this.daysOfWeek.forEach((val: string) => {
      allOk = allOk && this.weekTimeTable[val].spanCount === 100;
    });
    if (allOk) {
      this.saveMessage = 'Saving. Please Wait';
      let subjects: ISubjectTimeTable[] = [];
      const subCount = {};
      this.daysOfWeek.forEach((val: string) => {
        subCount[val] = 0;
        this.weekTimeTable[val].subjectsList.forEach(element => {
          element.subjects.forEach(sub => {
            if (!isString(sub)) {
              subjects.push({
                classType: sub.type,
                startTime: element.startTime,
                endTime: element.endTime,
                locationId: sub.location.id,
                subjectId: sub.subject.id
              });
              subCount[val] += 1;
            } else {
              subCount[val] = 1;
            }
          });
        });
      });
      this.subjectTimeTableService.saveAll(subjects).subscribe(
        (res: HttpResponse<ISubjectTimeTable[]>) => {
          subjects = res.body;
          this.createDayTimeTable(subjects, subCount);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
    } else {
    }
  }

  createDayTimeTable(subjects: ISubjectTimeTable[], subcount: any) {
    // console.log(subcount);
    this.timeTable.dayTimeTables = [];
    this.daysOfWeek.forEach((day: DayOfWeek) => {
      if (subcount[day] === 1) {
        this.timeTable.dayTimeTables.push({
          dayOfWeek: day,
          dayType: DayType['HOLIDAY'],
          subjects: null
        });
      } else {
        this.timeTable.dayTimeTables.push({
          dayOfWeek: day,
          dayType: DayType.WORKINGALL,
          subjects: subjects.splice(0, subcount[day])
        });
      }
    });
    this.daytimeTableService.saveAll(this.timeTable.dayTimeTables).subscribe(
      (res: HttpResponse<IDayTimeTable[]>) => {
        this.timeTable.dayTimeTables = res.body;
        this.createTimeTable();
      },
      err => {
        console.log(err);
      }
    );
  }

  createTimeTable() {
    this.timeTable.semester = this.wizardData.semester;
    this.timeTable.year = this.wizardData.year;
    this.timeTableService.create(this.timeTable).subscribe(
      (res: HttpResponse<ITimeTable>) => {
        this.timeTable = res.body;
      },
      err => {
        console.log(err);
      }
    );
  }

  disableLabFn() {
    if (!this.choosenDay) {
      this.disableLab = false;
      this.disableHoliday = false;
    } else {
      if (this.weekTimeTable[this.choosenDay].spanCount < 64) {
        this.disableLab = this.weekTimeTable[this.choosenDay].spanCount >= 24;
      } else {
        this.disableLab = this.weekTimeTable[this.choosenDay].spanCount >= 76;
      }
      this.disableHoliday = this.weekTimeTable[this.choosenDay].spanCount > 7;
    }
  }

  removeHoliday() {
    this.weekTimeTable[this.choosenDay] = {
      subjectsList: [],
      lastTime: 9 * 60 * 60 * 1000 + 30 * 60 * 1000,
      disableAdd: false,
      spanCount: 7
    };
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
}
