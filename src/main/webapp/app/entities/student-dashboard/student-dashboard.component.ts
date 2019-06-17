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

@Component({
  selector: 'jhi-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student.dashboard.scss']
})
export class StudentDashboardComponent implements OnInit {
  @ViewChild('next', { static: true }) next: ElementRef;
  @ViewChild('prev', { static: true }) prev: ElementRef;
  account: IUser;
  student: IStudent;
  department: IDepartment;
  attendances: IAttendance[];
  subject = [
    { subjectName: 'Subject 1', percentage: 70 },
    { subjectName: 'Subject 2', percentage: 80 },
    { subjectName: 'Subject 3', percentage: 50 },
    { subjectName: 'Subject 4', percentage: 20 }
  ];

  carouselTile = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    slide: 1,
    speed: 250,
    point: {
      visible: true
    },
    load: 1,
    loop: true,
    velocity: 0,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  constructor(
    private accountService: AccountService,
    private studentService: StudentService,
    private departmentService: DepartmentService,
    protected userService: UserService,
    protected dialog: MatDialog,
    protected attendanceService: AttendanceService
  ) {}

  ngOnInit() {
    this.accountService.identity().then((account: IUser) => {
      this.account = account;
      this.studentService.findbyUserID(this.account.id).subscribe((res: HttpResponse<IStudent>) => {
        this.student = res.body;
        console.log(this.student);
        this.departmentService.find(res.body.departmentId).subscribe((resp: HttpResponse<IDepartment>) => {
          this.department = resp.body;
          console.log(resp.body);
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

  goToNext() {
    this.next.nativeElement.click();
  }

  goToPrev() {
    this.prev.nativeElement.click();
  }
  loadAttendances() {
    this.attendanceService.getAllByDeviceID(this.account.deviceID).subscribe((res: HttpResponse<IAttendance[]>) => {
      console.log(res.body);
      this.attendances = res.body;
    });
  }

  addDeviceID() {
    this.userService.addDeviceID(this.account).subscribe((res: HttpResponse<IUser>) => {
      this.account.deviceID = res.body.deviceID;
      this.loadAttendances();
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DeviceIdDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addDeviceID();
      }
    });
  }
}
