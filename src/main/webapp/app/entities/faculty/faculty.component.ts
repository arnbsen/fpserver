import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFaculty } from 'app/shared/model/faculty.model';
import { AccountService, Account, UserService, IUser } from 'app/core';
import { FacultyService } from './faculty.service';
import { Department, IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from '../department';
import { MatDialog } from '@angular/material';
import { DeviceIdDialogComponent } from '../device-id-dialog/device-id-dialog.component';
import { IAttendance } from 'app/shared/model/attendance.model';
import { AttendanceService } from '../attendance';
import { ToolbarService } from 'app/shared/toolbar/toolbar.service';
import { CalcService } from 'app/shared/calculator.service';
import { SubjectService } from '../subject';
import { ISubject } from 'app/shared/model/subject.model';
import { IStudentCalc } from 'app/shared/model/studentcalc.model';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from '../student';

@Component({
  selector: 'jhi-faculty',
  templateUrl: './faculty.component.html'
})
export class FacultyComponent implements OnInit, OnDestroy {
  faculties: IFaculty[];
  attendances: IAttendance[];
  faculty: IFaculty;
  subd: any;
  sub: IStudentCalc;
  subjects: ISubject[];
  department: IDepartment;
  currentAccount: Account;
  eventSubscriber: Subscription;
  userParams: { id?: string; role?: string } = {};
  choosenSubject: ISubject;
  students: IStudent[];
  choosenStudent: IStudent;
  studd: any;
  choosenSubBool = false;
  choosenStudBool = false;
  loadOver = false;
  loadOverSelf = false;
  constructor(
    protected facultyService: FacultyService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    protected departmentService: DepartmentService,
    protected userService: UserService,
    protected dialog: MatDialog,
    protected subjectService: SubjectService,
    private toolbarService: ToolbarService,
    private calcService: CalcService,
    private studentService: StudentService
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
      if (this.currentAccount.deviceID) {
      }
      this.facultyService.findbyUserID(this.currentAccount.id).subscribe((res: HttpResponse<IFaculty>) => {
        this.faculty = res.body;
        this.userParams.role = 'faculty';
        this.userParams.id = this.faculty.id;
        this.filterSubjects();
        this.findAttendance();
        console.log(this.userParams);
        this.toolbarService.setUserParams(this.userParams);
        this.departmentService.find(res.body.departmentId).subscribe((resp: HttpResponse<IDepartment>) => {
          this.department = resp.body;
        });
      });
    });
    this.registerChangeInFaculties();
  }

  ngOnDestroy() {}

  trackId(index: number, item: IFaculty) {
    return item.id;
  }

  registerChangeInFaculties() {
    this.eventSubscriber = this.eventManager.subscribe('facultyListModification', response => this.loadAll());
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
  filterSubjects() {
    this.subjectService.bydeptyearsemfac(this.faculty.facultyCode).subscribe((res: any) => {
      this.subjects = res.body;
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
    this.calcService.findByFaculty(this.faculty.id).subscribe(
      (res: HttpResponse<IStudentCalc>) => {
        console.log(res.body);
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

  onSubjectChoose() {
    this.loadOver = false;
    const req: IStudent = {
      currentSem: this.choosenSubject.semester,
      currentYear: this.choosenSubject.year,
      departmentId: this.choosenSubject.ofDeptId
    };
    this.studentService.customfilter1(req).subscribe((res: HttpResponse<IStudent[]>) => {
      this.students = res.body.filter(val => val.departmentId === this.choosenSubject.ofDeptId);
      this.choosenSubBool = true;
    });
  }

  onChooseStudent() {
    this.choosenStudBool = true;
    this.calcService.findByStudent(this.choosenStudent.id).subscribe(
      (res: HttpResponse<IStudentCalc[]>) => {
        if (res.body) {
          const val = res.body.filter(val2 => val2.subjectName === this.choosenSubject.subjectCode + '-' + this.choosenSubject.subjectName);
          this.studd = {
            subjectName: this.choosenStudent.classRollNumber,
            percentage: Math.floor((val[0].attendance / val[0].totalAttendance) * 100),
            attendance: Number(val[0].attendance),
            totalAttendance: Number(val[0].totalAttendance)
          };
        }
        this.choosenStudent = undefined;
        this.choosenSubject = undefined;
        this.loadOver = true;
        this.choosenSubBool = false;
        this.choosenStudBool = false;
      },
      err => {
        this.choosenStudent = undefined;
        this.choosenSubject = undefined;
        this.choosenSubBool = false;
        this.choosenStudBool = false;
        this.loadOver = true;
      }
    );
  }
}
