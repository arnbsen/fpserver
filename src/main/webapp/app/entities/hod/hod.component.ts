import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Account } from 'app/core';
import { AccountService, UserService, IUser } from 'app/core';
import { HODService } from './hod.service';
import { IFaculty, OFaculty } from 'app/shared/model/faculty.model';
import { IAttendance } from 'app/shared/model/attendance.model';
import { IStudentCalc } from 'app/shared/model/studentcalc.model';
import { ISubject } from 'app/shared/model/subject.model';
import { IDepartment } from 'app/shared/model/department.model';
import { IStudent } from 'app/shared/model/student.model';
import { FacultyService } from '../faculty';
import { DepartmentService } from '../department';
import { MatDialog } from '@angular/material';
import { SubjectService } from '../subject';
import { ToolbarService } from 'app/shared/toolbar/toolbar.service';
import { CalcService } from 'app/shared/calculator.service';
import { StudentService } from '../student';
import { DeviceIdDialogComponent } from '../device-id-dialog/device-id-dialog.component';
import { IHOD } from 'app/shared/model/hod.model';
import { ActivateService } from 'app/account';

@Component({
  selector: 'jhi-hod',
  templateUrl: './hod.component.html'
})
export class HODComponent implements OnInit, OnDestroy {
  faculties: OFaculty[];
  attendances: IAttendance[];
  hod: IHOD;
  subd: any;
  sub: IStudentCalc;
  faculty: IFaculty;
  hODS: any;
  subjects: ISubject[];
  department: IDepartment;
  currentAccount: Account;
  eventSubscriber: Subscription;
  userParams: { id?: string; role?: string } = {};
  choosenSubject: ISubject;
  students: IStudent[];
  choosenStudent: IStudent;
  studd: any;
  studSubject: any[] = [];
  choosenSubBool = false;
  choosenStudBool = false;
  loadOver = false;
  year: number;
  sem: number;
  loadOverSelf = false;
  selectedRollNo = false;
  constructor(
    protected facultyService: FacultyService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    protected departmentService: DepartmentService,
    protected userService: UserService,
    protected dialog: MatDialog,
    protected subjectService: SubjectService,
    protected hodService: HODService,
    private toolbarService: ToolbarService,
    private calcService: CalcService,
    private studentService: StudentService,
    private activateService: ActivateService
  ) {}

  loadAllFaculty() {
    this.faculties = [];
    this.facultyService.filterByDept(this.department.id).subscribe(
      (res: HttpResponse<OFaculty[]>) => {
        this.faculties = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    // this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
      if (this.currentAccount.deviceID) {
      }
      this.hodService.findbyUserID(this.currentAccount.id).subscribe((res: HttpResponse<IHOD>) => {
        console.log(res.body);
        this.hod = res.body;
        this.userParams.role = 'hod';
        this.userParams.id = this.hod.id;
        this.toolbarService.setUserParams(this.userParams);
        this.findAttendance();
        this.departmentService.find(res.body.departmentId).subscribe((resp: HttpResponse<IDepartment>) => {
          this.department = resp.body;
          this.loadAllFaculty();
        });
      });
    });
  }

  ngOnDestroy() {}

  trackId(index: number, item: IFaculty) {
    return item.id;
  }

  registerChangeInFaculties() {}

  getSemester(val: number): number[] {
    return [val * 2 - 1, val * 2];
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  addDeviceID() {
    this.userService.addDeviceID(this.currentAccount).subscribe((res: HttpResponse<IUser>) => {
      this.currentAccount.deviceID = res.body.deviceID;
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DeviceIdDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.currentAccount.deviceID = result;
        this.addDeviceID();
      }
    });
  }
  fetchAllStudents() {
    const student: IStudent = {
      currentSem: this.sem,
      currentYear: this.year,
      departmentId: this.department.deptCode
    };
    this.studentService.customfilter1(student).subscribe((res: HttpResponse<IStudent[]>) => {
      this.students = res.body;
      this.choosenStudBool = true;
    });
  }

  getNumber(num: string): number {
    return Number(num);
  }
  getColor(num: string): string {
    const check = Number(num);
    return check <= 30 ? 'warn' : check <= 50 ? 'accent' : 'primary';
  }
  findAttendance() {
    this.loadOverSelf = false;
    this.subd = null;
    this.calcService.findByFaculty(this.hod.id).subscribe(
      (res: HttpResponse<IStudentCalc>) => {
        this.sub = res.body;
        this.subd = {
          subjectName: 'Your Attendance',
          percentage: Math.floor((this.sub.attendance / this.sub.totalAttendance) * 100),
          attendance: Number(this.sub.attendance),
          totalAttendance: Number(this.sub.totalAttendance)
        };
        this.loadOverSelf = true;
      },
      err => (this.loadOverSelf = true)
    );
  }

  findAttendanceStudent(student: IStudent) {
    this.loadOver = false;
    this.selectedRollNo = true;
    this.studSubject = [];
    this.calcService.findByStudent(student.id).subscribe(
      (res: HttpResponse<IStudentCalc[]>) => {
        res.body.forEach((val: IStudentCalc) => {
          this.studSubject.push({
            subjectName: val.subjectName,
            percentage: Math.floor((val.attendance / val.totalAttendance) * 100),
            attendance: Number(val.attendance),
            totalAttendance: Number(val.totalAttendance)
          });
        });
        this.loadOver = true;
      },
      err => (this.loadOver = true)
    );
  }
  onSubjectChoose() {
    this.loadOver = false;
    const req: IStudent = {
      currentSem: this.choosenSubject.semester,
      currentYear: this.choosenSubject.year,
      departmentId: this.choosenSubject.ofDeptId
    };
    this.studentService.customfilter1(req).subscribe((res: HttpResponse<IStudent[]>) => {
      this.students = res.body.filter(val => val.departmentId === this.choosenSubject.ofDeptId);
      this.choosenStudBool = true;
    });
  }

  activateFaculty(id: string) {
    this.activateService.get(id).subscribe(
      (res: HttpResponse<any>) => {
        this.loadAllFaculty();
      },
      err => this.loadAllFaculty()
    );
  }
}
