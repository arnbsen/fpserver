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

@Component({
  selector: 'jhi-faculty',
  templateUrl: './faculty.component.html'
})
export class FacultyComponent implements OnInit, OnDestroy {
  faculties: IFaculty[];
  attendances: IAttendance[];
  faculty: IFaculty;
  department: IDepartment;
  currentAccount: Account;
  eventSubscriber: Subscription;

  constructor(
    protected facultyService: FacultyService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    protected departmentService: DepartmentService,
    protected userService: UserService,
    protected dialog: MatDialog,
    protected attendanceService: AttendanceService
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
        this.loadAttendances();
      }
      this.facultyService.findbyUserID(this.currentAccount.id).subscribe((res: HttpResponse<IFaculty>) => {
        this.faculty = res.body;
        this.departmentService.find(res.body.departmentId).subscribe((resp: HttpResponse<IDepartment>) => {
          this.department = resp.body;
        });
      });
    });
    this.registerChangeInFaculties();
  }

  loadAttendances() {
    this.attendanceService.getAllByDeviceID(this.currentAccount.deviceID).subscribe((res: HttpResponse<IAttendance[]>) => {
      console.log(res.body);
      this.attendances = res.body;
    });
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

  addDeviceID() {
    this.userService.addDeviceID(this.currentAccount).subscribe((res: HttpResponse<IUser>) => {
      this.currentAccount.deviceID = res.body.deviceID;
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
