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
    protected router: Router
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
        endDate: this.editacademicSessionForm.value.endDate
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

  saveDepartmentForm() {
    if (this.editDepartmentForm.valid) {
      this.isDepartmentCreationSaving = true;
      this.editDepartment = {
        deptCode: this.editDepartmentForm.value.deptCode,
        deptName: this.editDepartmentForm.value.deptName
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

  protected subscribeToSaveResponseAcademicForm(result: Observable<HttpResponse<IAcademicSession>>) {
    result.subscribe((res: HttpResponse<IAcademicSession>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected subscribeToSaveResponseDepartmentForm(result: Observable<HttpResponse<IDepartment>>) {
    result.subscribe((res: HttpResponse<IDepartment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    console.log('Success');
    this.editacademicSessionForm = undefined;
    this.editDepartmentForm = undefined;
    this.getAllAcademicSession();
    this.getAllDepartments();
    this.isAcademicCreationSaving = false;
    this.isDepartmentCreationSaving = false;
  }

  protected onSaveError() {
    console.log('Fail');
    this.isAcademicCreationSaving = false;
    this.isDepartmentCreationSaving = false;
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
}
