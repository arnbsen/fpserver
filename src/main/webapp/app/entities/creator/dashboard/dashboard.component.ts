import { Component, OnInit } from '@angular/core';
import { IAcademicSession } from 'app/shared/model/academic-session.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AcademicSessionService } from 'app/entities/academic-session/academic-session.service';
import { Observable, of } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import { filter, map } from 'rxjs/operators';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department/department.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { StudentService } from 'app/entities/student';
import { UserService } from 'app/core';
import { IStudent } from 'app/shared/model/student.model';

export const MY_FORMATS2 = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS2 }
  ]
})
export class DashboardComponent implements OnInit {
  // Variables for Session Creation
  editacademicSession: IAcademicSession;
  editacademicSessionForm: FormGroup;
  academicSessions: IAcademicSession[] = [];
  isAcademicCreationSaving = false;

  // Variables for Department Creation
  editDepartment: IDepartment;
  editDepartmentForm: FormGroup;
  departments: IDepartment[] = [];
  isDepartmentCreationSaving = false;

  constructor(
    private fb: FormBuilder,
    protected academicSessionService: AcademicSessionService,
    protected departmentService: DepartmentService,
    protected router: Router,
    private _snackBar: MatSnackBar,
    private studentService: StudentService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getAllAcademicSession();
    this.getAllDepartments();
  }

  createSessionForm() {
    this.editacademicSessionForm = new FormGroup({
      academicSession: new FormControl('', Validators.required),
      startDate: new FormControl(moment(), Validators.required),
      endDate: new FormControl(moment(), Validators.required)
    });
  }

  patchAcademicSessionForm(session: IAcademicSession) {
    this.editacademicSessionForm = new FormGroup({
      academicSession: new FormControl(session.academicSession, Validators.required),
      startDate: new FormControl(session.startDate, Validators.required),
      endDate: new FormControl(session.endDate, Validators.required),
      id: new FormControl(session.id)
    });
  }

  deleteAcademicSession(session: IAcademicSession) {
    this.academicSessionService.delete(session.id).subscribe(
      (res: any) => {
        this.openSnackBar('Sucessfully Deleted', 'Done');
        this.getAllAcademicSession();
      },
      err => this.openSnackBar('Failed To Delete', 'Done')
    );
  }

  createDepartmentForm() {
    this.editDepartmentForm = new FormGroup({
      deptCode: new FormControl('', Validators.required),
      deptName: new FormControl('', Validators.required)
    });
  }

  getAllAcademicSession() {
    this.academicSessionService
      .query()
      .pipe(
        filter((res: HttpResponse<IAcademicSession[]>) => res.ok),
        map((res: HttpResponse<IAcademicSession[]>) => res.body)
      )
      .subscribe(
        (res: IAcademicSession[]) => {
          this.academicSessions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }
  onError(message: string): void {}

  getAllDepartments() {
    this.departmentService
      .query()
      .pipe(
        filter((res: HttpResponse<IDepartment[]>) => res.ok),
        map((res: HttpResponse<IDepartment[]>) => res.body)
      )
      .subscribe(
        (res: IDepartment[]) => {
          this.departments = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  saveAcademicForm() {
    if (this.editacademicSessionForm.valid) {
      this.isAcademicCreationSaving = true;
      this.editacademicSession = {
        academicSession: this.editacademicSessionForm.value.academicSession,
        startDate: this.editacademicSessionForm.value.startDate,
        endDate: this.editacademicSessionForm.value.endDate,
        id: this.editacademicSessionForm.value.id
      };
      if (this.editacademicSession.id !== undefined) {
        this.subscribeToSaveResponseAcademicForm(this.academicSessionService.update(this.editacademicSession));
      } else {
        this.subscribeToSaveResponseAcademicForm(this.academicSessionService.create(this.editacademicSession));
      }
    } else {
      return;
    }
  }

  patchDepartmentForm(department: IDepartment) {
    this.editDepartmentForm = new FormGroup({
      deptCode: new FormControl(department.deptCode, Validators.required),
      deptName: new FormControl(department.deptName, Validators.required),
      id: new FormControl(department.id)
    });
  }

  saveDepartmentForm() {
    if (this.editDepartmentForm.valid) {
      this.isDepartmentCreationSaving = true;
      this.editDepartment = {
        deptCode: this.editDepartmentForm.value.deptCode,
        deptName: this.editDepartmentForm.value.deptName,
        id: this.editDepartmentForm.value.id
      };
      if (this.editDepartment.id !== undefined) {
        this.subscribeToSaveResponseDepartmentForm(this.departmentService.update(this.editDepartment));
      } else {
        this.subscribeToSaveResponseDepartmentForm(this.departmentService.create(this.editDepartment));
      }
    } else {
      return;
    }
  }

  deleteDepartment(department: IDepartment) {
    this.departmentService.delete(department.id).subscribe(
      (res: any) => {
        this.openSnackBar('Sucessfully Deleted', 'Done');
        this.getAllDepartments();
      },
      err => this.openSnackBar('Failed To Delete', 'Done')
    );
  }

  upgradeSemester() {
    this.studentService.upgradeSemester().subscribe(
      (res: HttpResponse<any>) => {
        this.openSnackBar('All Students Upgraded to next sem', 'Done');
      },
      err => {
        console.log(err);
        this.openSnackBar('Something Bad Happened. Retry again', 'Okay');
      }
    );
  }

  protected subscribeToSaveResponseAcademicForm(result: Observable<HttpResponse<IAcademicSession>>) {
    result.subscribe((res: HttpResponse<IAcademicSession>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected subscribeToSaveResponseDepartmentForm(result: Observable<HttpResponse<IDepartment>>) {
    result.subscribe((res: HttpResponse<IDepartment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.editacademicSessionForm = undefined;
    this.editDepartmentForm = undefined;
    this.getAllAcademicSession();
    this.getAllDepartments();
    this.isAcademicCreationSaving = false;
    this.isDepartmentCreationSaving = false;
    this.openSnackBar('Action Sucessfull', 'Done');
  }

  protected onSaveError() {
    this.isAcademicCreationSaving = false;
    this.isDepartmentCreationSaving = false;
    this.openSnackBar('Action Failed', 'Done');
  }

  checkDateRange(session: IAcademicSession): boolean {
    const today = new Date();
    if (today >= session.startDate.toDate() && today <= session.endDate.toDate()) {
      return true;
    } else {
      return false;
    }
  }

  goToDeptEdit(id: String) {
    this.router.navigate(['/admin', id, 'edit']);
  }

  goToSpecialOccasions(id: string) {
    this.router.navigate(['/special-occasions', 'admin', id, 'edit']);
  }

  // Deleting Methods
  deleteAcademicSessions(id: string) {
    this.academicSessionService.delete(id).subscribe(
      (res: HttpResponse<any>) => {
        this.openSnackBar('Academic Session Successfully Deleted', 'Done');
      },
      err => {
        this.openSnackBar('Something Bad Happened. Retry again', 'Okay');
      }
    );
  }

  deleteLastYearStudents() {
    this.studentService.deleteLastYearStudents().subscribe(
      (res: HttpResponse<IStudent[]>) => {
        const userids = [];
        res.body.forEach(student => userids.push(student.userId));
        this.deleteLastYearUsers(userids);
      },
      err => {
        this.openSnackBar('Something Bad Happened. Retry again', 'Okay');
      }
    );
  }

  deleteLastYearUsers(users: string[]) {
    this.userService.removeUsersByIdsBatch(users).subscribe(
      (res: HttpResponse<any>) => {
        this.openSnackBar('Last Year Students Successfully Deleted', 'Done');
      },
      err => {
        this.openSnackBar('Something Bad Happened. Retry again', 'Okay');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  goToSystemMetrics() {
    this.router.navigate(['/system', 'metrics']);
  }

  goToDevicePage() {
    this.router.navigate(['/device']);
  }
}
