import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITimeTable, TimeTable } from 'app/shared/model/time-table.model';
import { TimeTableService } from './time-table.service';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department';

@Component({
  selector: 'jhi-time-table-update',
  templateUrl: './time-table-update.component.html'
})
export class TimeTableUpdateComponent implements OnInit {
  timeTable: ITimeTable;
  isSaving: boolean;

  departments: IDepartment[];

  editForm = this.fb.group({
    id: [],
    year: [],
    semester: [],
    departmentId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected timeTableService: TimeTableService,
    protected departmentService: DepartmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ timeTable }) => {
      this.updateForm(timeTable);
      this.timeTable = timeTable;
    });
    this.departmentService
      .query({ filter: 'timetable-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDepartment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDepartment[]>) => response.body)
      )
      .subscribe(
        (res: IDepartment[]) => {
          if (!this.timeTable.departmentId) {
            this.departments = res;
          } else {
            this.departmentService
              .find(this.timeTable.departmentId)
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

  updateForm(timeTable: ITimeTable) {
    this.editForm.patchValue({
      id: timeTable.id,
      year: timeTable.year,
      semester: timeTable.semester,
      departmentId: timeTable.departmentId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const timeTable = this.createFromForm();
    if (timeTable.id !== undefined) {
      this.subscribeToSaveResponse(this.timeTableService.update(timeTable));
    } else {
      this.subscribeToSaveResponse(this.timeTableService.create(timeTable));
    }
  }

  private createFromForm(): ITimeTable {
    const entity = {
      ...new TimeTable(),
      id: this.editForm.get(['id']).value,
      year: this.editForm.get(['year']).value,
      semester: this.editForm.get(['semester']).value,
      departmentId: this.editForm.get(['departmentId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITimeTable>>) {
    result.subscribe((res: HttpResponse<ITimeTable>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
