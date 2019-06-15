import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISubject, Subject } from 'app/shared/model/subject.model';
import { SubjectService } from './subject.service';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department';

@Component({
  selector: 'jhi-subject-update',
  templateUrl: './subject-update.component.html'
})
export class SubjectUpdateComponent implements OnInit {
  subject: ISubject;
  isSaving: boolean;

  ofdepts: IDepartment[];

  editForm = this.fb.group({
    id: [],
    subjectCode: [null, [Validators.required]],
    subjectName: [null, [Validators.required]],
    year: [null, [Validators.required]],
    semester: [null, [Validators.required]],
    ofDeptId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected subjectService: SubjectService,
    protected departmentService: DepartmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ subject }) => {
      this.updateForm(subject);
      this.subject = subject;
    });
    this.departmentService
      .query({ filter: 'subject-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDepartment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDepartment[]>) => response.body)
      )
      .subscribe(
        (res: IDepartment[]) => {
          if (!this.subject.ofDeptId) {
            this.ofdepts = res;
          } else {
            this.departmentService
              .find(this.subject.ofDeptId)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IDepartment>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IDepartment>) => subResponse.body)
              )
              .subscribe(
                (subRes: IDepartment) => (this.ofdepts = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(subject: ISubject) {
    this.editForm.patchValue({
      id: subject.id,
      subjectCode: subject.subjectCode,
      subjectName: subject.subjectName,
      year: subject.year,
      semester: subject.semester,
      ofDeptId: subject.ofDeptId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const subject = this.createFromForm();
    if (subject.id !== undefined) {
      this.subscribeToSaveResponse(this.subjectService.update(subject));
    } else {
      this.subscribeToSaveResponse(this.subjectService.create(subject));
    }
  }

  private createFromForm(): ISubject {
    const entity = {
      ...new Subject(),
      id: this.editForm.get(['id']).value,
      subjectCode: this.editForm.get(['subjectCode']).value,
      subjectName: this.editForm.get(['subjectName']).value,
      year: this.editForm.get(['year']).value,
      semester: this.editForm.get(['semester']).value,
      ofDeptId: this.editForm.get(['ofDeptId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubject>>) {
    result.subscribe((res: HttpResponse<ISubject>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
