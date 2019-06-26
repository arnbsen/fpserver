import { Component, OnInit, ViewChild, ViewRef, ElementRef } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from '../student/student.service';
import { HttpResponse } from '@angular/common/http';
import { DepartmentService } from '../department';
import { IDepartment } from 'app/shared/model/department.model';
import { getNumberOfCurrencyDigits } from '@angular/common';
import { IUser, UserService } from 'app/core';
import { MatDialog } from '@angular/material';
import { AttendanceService } from '../attendance';
import { IAttendance } from 'app/shared/model/attendance.model';
import { DeviceIdDialogComponent } from '../device-id-dialog/device-id-dialog.component';
import { ToolbarService } from 'app/shared/toolbar/toolbar.service';
import { CalcService } from 'app/shared/calculator.service';
import { IStudentCalc } from 'app/shared/model/studentcalc.model';

@Component({
  selector: 'jhi-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student.dashboard.scss']
})
export class StudentDashboardComponent implements OnInit {
  account: IUser;
  student: IStudent;
  department: IDepartment;
  attendances: IAttendance[];
  userParams: { id?: string; role?: string };
  studentParams: { year?: number; semester?: number; department?: string };
  subject = [];
  loadOver = false;

  constructor(
    private accountService: AccountService,
    private studentService: StudentService,
    private departmentService: DepartmentService,
    protected userService: UserService,
    protected dialog: MatDialog,
    private toolbarService: ToolbarService,
    private calcService: CalcService
  ) {}

  ngOnInit() {
    this.userParams = {};
    this.studentParams = {};
    this.userParams.role = 'student';
    this.accountService.identity().then((account: IUser) => {
      this.account = account;
      this.studentService.findbyUserID(this.account.id).subscribe((res: HttpResponse<IStudent>) => {
        this.student = res.body;
        this.findAttendance();
        this.studentParams.semester = this.student.currentSem;
        this.studentParams.year = this.student.currentYear;
        this.studentParams.department = this.student.departmentId;
        this.userParams.id = this.student.id;
        this.toolbarService.setUserParams(this.userParams);
        this.toolbarService.setstudentDetails(this.studentParams);
        this.departmentService.find(res.body.departmentId).subscribe((resp: HttpResponse<IDepartment>) => {
          this.department = resp.body;
        });
      });
    });
  }
  getNumber(num: string): number {
    return Number(num);
  }
  getColor(num: string): string {
    const check = Number(num);
    return check <= 30 ? 'warn' : check <= 50 ? 'accent' : 'primary';
  }

  addDeviceID() {
    this.userService.addDeviceID(this.account).subscribe((res: HttpResponse<IUser>) => {
      this.account.deviceID = res.body.deviceID;
      this.findAttendance();
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DeviceIdDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.account.deviceID = result;
        this.addDeviceID();
      }
    });
  }

  findAttendance() {
    this.loadOver = false;
    this.calcService.findByStudent(this.student.id).subscribe(
      (res: HttpResponse<IStudentCalc[]>) => {
        if (res.body) {
          res.body.forEach((val: IStudentCalc) => {
            this.subject.push({
              subjectName: val.subjectName,
              percentage: Math.floor((val.attendance / val.totalAttendance) * 100),
              attendance: Number(val.attendance),
              totalAttendance: Number(val.totalAttendance)
            });
          });
        }
        this.loadOver = true;
      },
      err => (this.loadOver = true)
    );
  }
}
