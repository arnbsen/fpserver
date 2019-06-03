import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IHOD, HOD } from 'app/shared/model/hod.model';
import { HODService } from './hod.service';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department';

@Component({
  selector: 'jhi-hod-update',
  templateUrl: './hod-update.component.html'
})
export class HODUpdateComponent implements OnInit {
  hOD: IHOD;
  isSaving: boolean;

  departments: IDepartment[];

  editForm = this.fb.group({
    id: [],
    authCode: [],
    departmentId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected hODService: HODService,
    protected departmentService: DepartmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ hOD }) => {
      this.updateForm(hOD);
      this.hOD = hOD;
    });
    this.departmentService
      .query({ filter: 'hod-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDepartment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDepartment[]>) => response.body)
      )
      .subscribe(
        (res: IDepartment[]) => {
          if (!this.hOD.departmentId) {
            this.departments = res;
          } else {
            this.departmentService
              .find(this.hOD.departmentId)
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

  updateForm(hOD: IHOD) {
    this.editForm.patchValue({
      id: hOD.id,
      authCode: hOD.authCode,
      departmentId: hOD.departmentId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const hOD = this.createFromForm();
    if (hOD.id !== undefined) {
      this.subscribeToSaveResponse(this.hODService.update(hOD));
    } else {
      this.subscribeToSaveResponse(this.hODService.create(hOD));
    }
  }

  private createFromForm(): IHOD {
    const entity = {
      ...new HOD(),
      id: this.editForm.get(['id']).value,
      authCode: this.editForm.get(['authCode']).value,
      departmentId: this.editForm.get(['departmentId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHOD>>) {
    result.subscribe((res: HttpResponse<IHOD>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
