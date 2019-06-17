import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISubjectTimeTable, SubjectTimeTable } from 'app/shared/model/subject-time-table.model';
import { SubjectTimeTableService } from './subject-time-table.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location';
import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from 'app/entities/subject';
import { IDayTimeTable } from 'app/shared/model/day-time-table.model';
import { DayTimeTableService } from 'app/entities/day-time-table';

@Component({
  selector: 'jhi-subject-time-table-update',
  templateUrl: './subject-time-table-update.component.html'
})
export class SubjectTimeTableUpdateComponent implements OnInit {
  subjectTimeTable: ISubjectTimeTable;
  isSaving: boolean;

  locations: ILocation[];

  subjects: ISubject[];

  daytimetables: IDayTimeTable[];

  editForm = this.fb.group({
    id: [],
    startTime: [],
    endTime: [],
    classType: [],
    locationId: [],
    subjectId: [null, Validators.required],
    dayTimeTableId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected subjectTimeTableService: SubjectTimeTableService,
    protected locationService: LocationService,
    protected subjectService: SubjectService,
    protected dayTimeTableService: DayTimeTableService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ subjectTimeTable }) => {
      this.updateForm(subjectTimeTable);
      this.subjectTimeTable = subjectTimeTable;
    });
    this.locationService
      .query({ filter: 'subjecttimetable-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ILocation[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILocation[]>) => response.body)
      )
      .subscribe(
        (res: ILocation[]) => {
          if (!this.subjectTimeTable.locationId) {
            this.locations = res;
          } else {
            this.locationService
              .find(this.subjectTimeTable.locationId)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ILocation>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ILocation>) => subResponse.body)
              )
              .subscribe(
                (subRes: ILocation) => (this.locations = [subRes].concat(res)),
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
    this.dayTimeTableService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDayTimeTable[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDayTimeTable[]>) => response.body)
      )
      .subscribe((res: IDayTimeTable[]) => (this.daytimetables = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(subjectTimeTable: ISubjectTimeTable) {
    this.editForm.patchValue({
      id: subjectTimeTable.id,
      startTime: subjectTimeTable.startTime,
      endTime: subjectTimeTable.endTime,
      classType: subjectTimeTable.classType,
      locationId: subjectTimeTable.locationId,
      subjectId: subjectTimeTable.subjectId,
      dayTimeTableId: subjectTimeTable.dayTimeTableId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const subjectTimeTable = this.createFromForm();
    if (subjectTimeTable.id !== undefined) {
      this.subscribeToSaveResponse(this.subjectTimeTableService.update(subjectTimeTable));
    } else {
      this.subscribeToSaveResponse(this.subjectTimeTableService.create(subjectTimeTable));
    }
  }

  private createFromForm(): ISubjectTimeTable {
    const entity = {
      ...new SubjectTimeTable(),
      id: this.editForm.get(['id']).value,
      startTime: this.editForm.get(['startTime']).value,
      endTime: this.editForm.get(['endTime']).value,
      classType: this.editForm.get(['classType']).value,
      locationId: this.editForm.get(['locationId']).value,
      subjectId: this.editForm.get(['subjectId']).value,
      dayTimeTableId: this.editForm.get(['dayTimeTableId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubjectTimeTable>>) {
    result.subscribe((res: HttpResponse<ISubjectTimeTable>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackLocationById(index: number, item: ILocation) {
    return item.id;
  }

  trackSubjectById(index: number, item: ISubject) {
    return item.id;
  }

  trackDayTimeTableById(index: number, item: IDayTimeTable) {
    return item.id;
  }
}
