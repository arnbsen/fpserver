import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDepartment, Department } from 'app/shared/model/department.model';
import { DepartmentService } from './department.service';

@Component({
  selector: 'jhi-department-update',
  templateUrl: './department-update.component.html'
})
export class DepartmentUpdateComponent implements OnInit {
  department: IDepartment;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    deptCode: [null, [Validators.required]],
    deptName: [null, [Validators.required]]
  });

  constructor(protected departmentService: DepartmentService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ department }) => {
      this.updateForm(department);
      this.department = department;
    });
  }

  updateForm(department: IDepartment) {
    this.editForm.patchValue({
      id: department.id,
      deptCode: department.deptCode,
      deptName: department.deptName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const department = this.createFromForm();
    if (department.id !== undefined) {
      this.subscribeToSaveResponse(this.departmentService.update(department));
    } else {
      this.subscribeToSaveResponse(this.departmentService.create(department));
    }
  }

  private createFromForm(): IDepartment {
    const entity = {
      ...new Department(),
      id: this.editForm.get(['id']).value,
      deptCode: this.editForm.get(['deptCode']).value,
      deptName: this.editForm.get(['deptName']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartment>>) {
    result.subscribe((res: HttpResponse<IDepartment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
