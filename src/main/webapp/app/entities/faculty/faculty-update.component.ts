import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFaculty, Faculty } from 'app/shared/model/faculty.model';
import { FacultyService } from './faculty.service';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department';
import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from 'app/entities/subject';

@Component({
  selector: 'jhi-faculty-update',
  templateUrl: './faculty-update.component.html'
})
export class FacultyUpdateComponent implements OnInit {
  faculty: IFaculty;
  isSaving: boolean;

  departments: IDepartment[];

  subjects: ISubject[];

  editForm = this.fb.group({
    id: [],
    facultyCode: [],
    departmentId: [null, Validators.required],
    subjectId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected facultyService: FacultyService,
    protected departmentService: DepartmentService,
    protected subjectService: SubjectService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ faculty }) => {
      this.updateForm(faculty);
      this.faculty = faculty;
    });
    this.departmentService
      .query({ filter: 'faculty-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDepartment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDepartment[]>) => response.body)
      )
      .subscribe(
        (res: IDepartment[]) => {
          if (!this.faculty.departmentId) {
            this.departments = res;
          } else {
            this.departmentService
              .find(this.faculty.departmentId)
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
    this.subjectService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISubject[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISubject[]>) => response.body)
      )
      .subscribe((res: ISubject[]) => (this.subjects = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(faculty: IFaculty) {
    this.editForm.patchValue({
      id: faculty.id,
      facultyCode: faculty.facultyCode,
      departmentId: faculty.departmentId,
      subjectId: faculty.subjectId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const faculty = this.createFromForm();
    if (faculty.id !== undefined) {
      this.subscribeToSaveResponse(this.facultyService.update(faculty));
    } else {
      this.subscribeToSaveResponse(this.facultyService.create(faculty));
    }
  }

  private createFromForm(): IFaculty {
    const entity = {
      ...new Faculty(),
      id: this.editForm.get(['id']).value,
      facultyCode: this.editForm.get(['facultyCode']).value,
      departmentId: this.editForm.get(['departmentId']).value,
      subjectId: this.editForm.get(['subjectId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFaculty>>) {
    result.subscribe((res: HttpResponse<IFaculty>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackSubjectById(index: number, item: ISubject) {
    return item.id;
  }
}
