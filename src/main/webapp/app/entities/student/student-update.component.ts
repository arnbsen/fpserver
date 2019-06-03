import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IStudent, Student } from 'app/shared/model/student.model';
import { StudentService } from './student.service';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department';

@Component({
  selector: 'jhi-student-update',
  templateUrl: './student-update.component.html'
})
export class StudentUpdateComponent implements OnInit {
  student: IStudent;
  isSaving: boolean;

  departments: IDepartment[];

  editForm = this.fb.group({
    id: [],
    yearJoined: [],
    currentYear: [],
    currentSem: [],
    classRollNumber: [],
    currentSession: [],
    departmentId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected studentService: StudentService,
    protected departmentService: DepartmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ student }) => {
      this.updateForm(student);
      this.student = student;
    });
    this.departmentService
      .query({ filter: 'student-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDepartment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDepartment[]>) => response.body)
      )
      .subscribe(
        (res: IDepartment[]) => {
          if (!this.student.departmentId) {
            this.departments = res;
          } else {
            this.departmentService
              .find(this.student.departmentId)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IDepartment>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IDepartment>) => subResponse.body)
              )
              .subscribe(
                (subRes: IDepartment) => (this.departments = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(student: IStudent) {
    this.editForm.patchValue({
      id: student.id,
      yearJoined: student.yearJoined,
      currentYear: student.currentYear,
      currentSem: student.currentSem,
      classRollNumber: student.classRollNumber,
      currentSession: student.currentSession,
      departmentId: student.departmentId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const student = this.createFromForm();
    if (student.id !== undefined) {
      this.subscribeToSaveResponse(this.studentService.update(student));
    } else {
      this.subscribeToSaveResponse(this.studentService.create(student));
    }
  }

  private createFromForm(): IStudent {
    const entity = {
      ...new Student(),
      id: this.editForm.get(['id']).value,
      yearJoined: this.editForm.get(['yearJoined']).value,
      currentYear: this.editForm.get(['currentYear']).value,
      currentSem: this.editForm.get(['currentSem']).value,
      classRollNumber: this.editForm.get(['classRollNumber']).value,
      currentSession: this.editForm.get(['currentSession']).value,
      departmentId: this.editForm.get(['departmentId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>) {
    result.subscribe((res: HttpResponse<IStudent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackDepartmentById(index: number, item: IDepartment) {
    return item.id;
  }
}
