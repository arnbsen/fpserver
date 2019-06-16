import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ITimeTable } from 'app/shared/model/time-table.model';
import { ActivatedRoute } from '@angular/router';
import { IDepartment } from 'app/shared/model/department.model';
import { TimeTableMetaDataDialogComponent } from './time-table-wizard.metadata';
import { SubjectTimeTableService } from '../subject-time-table';
import { DayTimeTableService } from '../day-time-table';
import { TimeTableService } from '../time-table/time-table.service';
import { ISubjectTimeTable } from 'app/shared/model/subject-time-table.model';
import { ISubject, Subject } from 'app/shared/model/subject.model';
import { Time } from '@angular/common';
import { isString } from 'util';
import { SubjectService } from '../subject';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { SubjectChooserDialogComponent } from './subject.chooser.dialog.component';
import { IFaculty } from 'app/shared/model/faculty.model';
import { anyTypeAnnotation } from '@babel/types';

export interface DialogData {
  year: number;
  semester: number;
}
export interface SubjectTimeTableData {
  subjectsList?: [
    {
      subjects: ISubject[] | string[];
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
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
  wizardData: DialogData;
  choosenDay: string;
  subjects: ISubject[];
  weekTimeTable = {};

  constructor(
    public dialog: MatDialog,
    protected activatedRoute: ActivatedRoute,
    protected subjectTimeTableService: SubjectTimeTableService,
    protected daytimeTableService: DayTimeTableService,
    protected timeTableService: TimeTableService,
    protected subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.department = department;
      this.timeTable.departmentId = this.department.id;
      this.loadAllSubjects();
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

  openDialog() {
    const dialogRef = this.dialog.open(TimeTableMetaDataDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
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
        console.log(this.subjects);
        this.subjects = this.subjects.filter(
          (val: ISubject) =>
            val.semester === this.wizardData.semester && val.year === this.wizardData.year && val.ofDeptId === this.department.id
        );
        console.log(this.subjects);
      }
    });
  }

  chooseCurrentDay(day: string) {
    this.choosenDay = day;
    console.log(this.weekTimeTable[day]);
  }
  declareHoliday() {
    this.weekTimeTable[this.choosenDay].subjectsList = [];
    this.weekTimeTable[this.choosenDay].subjectsList.push({
      subjects: ['HOLIDAY'],
      span: 100
    });
    this.weekTimeTable[this.choosenDay].disableAdd = true;
    console.log(this.weekTimeTable);
  }

  checkForString(val: any) {
    return isString(val);
  }

  openSubjectChooser(type: string, subArray: ISubject[] = null) {
    const dialogRef = this.dialog.open(SubjectChooserDialogComponent, {
      data: this.subjects
    });
    type = this.weekTimeTable[this.choosenDay].spanCount === 55 ? 'TUTORIAL' : type;
    console.log(this.weekTimeTable[this.choosenDay].spanCount);

    const spanWidth = this.spanMeasure[type];
    dialogRef.afterClosed().subscribe(result => {
      if (!subArray) {
        this.weekTimeTable[this.choosenDay].subjectsList.push({
          subjects: [
            new Subject(result.id, result.subjectCode, result.subjectName, result.year, result.semester, result.ofDeptId, result.faculty)
          ],
          span: spanWidth,
          startTime: this.weekTimeTable[this.choosenDay].lastTime + 1,
          endTime: this.weekTimeTable[this.choosenDay].lastTime +=
            type === 'TUTORIAL' ? 35 * 60 * 1000 : type === 'REGULAR' ? 55 * 60 * 1000 : 3 * 60 * 60 * 1000
        });
        this.weekTimeTable[this.choosenDay].spanCount += spanWidth;
        console.log(this.weekTimeTable[this.choosenDay].spanCount);
        this.weekTimeTable[this.choosenDay].lastTime += this.weekTimeTable[this.choosenDay].spanCount === 31 ? 15 * 60 * 1000 : 0;
        this.weekTimeTable[this.choosenDay].lastTime += type === 'TUTORIAL' ? 45 * 60 * 1000 : 0;
        this.weekTimeTable[this.choosenDay].disableAdd = this.weekTimeTable[this.choosenDay].spanCount === 100;
      } else {
        subArray.push(
          new Subject(result.id, result.subjectCode, result.subjectName, result.year, result.semester, result.ofDeptId, result.faculty)
        );
      }
    });
  }

  createParagraph(sub: ISubject) {
    let fac = '';
    sub.faculty.forEach((facu: IFaculty) => {
      fac += facu.facultyCode + ' / ';
    });
    return '  ' + sub.subjectName + ' ' + fac;
  }

  removeSubject(data: any, subjects: ISubject[]) {
    console.log(this.weekTimeTable);
    subjects.pop();

    console.log(this.weekTimeTable[this.choosenDay]);
    console.log(data);
    if (subjects.length === 0 && data.subjectsList.length === 1) {
      data.subjectsList = [];
      data.lastTime = 9 * 60 * 60 * 1000 + 30 * 60 * 1000;
      data.disableAdd = false;
      data.spanCount = 7;
    }
    if (subjects.length === 0 && data.subjectsList.length > 1) {
      const param = data.subjectsList.pop();
      const index = data.subjectsList.length - 1;
      console.log(param);
      data.lastTime = param.endTime - param.startTime + 1;
      data.spanCount -= param.span;
      data.disableAdd = false;
    }
  }

  saveData() {
    console.log(this.weekTimeTable);
  }
}
