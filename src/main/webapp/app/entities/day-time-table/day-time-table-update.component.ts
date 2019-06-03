import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDayTimeTable, DayTimeTable } from 'app/shared/model/day-time-table.model';
import { DayTimeTableService } from './day-time-table.service';
import { ITimeTable } from 'app/shared/model/time-table.model';
import { TimeTableService } from 'app/entities/time-table';

@Component({
  selector: 'jhi-day-time-table-update',
  templateUrl: './day-time-table-update.component.html'
})
export class DayTimeTableUpdateComponent implements OnInit {
  dayTimeTable: IDayTimeTable;
  isSaving: boolean;

  timetables: ITimeTable[];

  editForm = this.fb.group({
    id: [],
    dayType: [null, [Validators.required]],
    dayOfWeek: [null, [Validators.required]],
    timeTableId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected dayTimeTableService: DayTimeTableService,
    protected timeTableService: TimeTableService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ dayTimeTable }) => {
      this.updateForm(dayTimeTable);
      this.dayTimeTable = dayTimeTable;
    });
    this.timeTableService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITimeTable[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITimeTable[]>) => response.body)
      )
      .subscribe((res: ITimeTable[]) => (this.timetables = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(dayTimeTable: IDayTimeTable) {
    this.editForm.patchValue({
      id: dayTimeTable.id,
      dayType: dayTimeTable.dayType,
      dayOfWeek: dayTimeTable.dayOfWeek,
      timeTableId: dayTimeTable.timeTableId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const dayTimeTable = this.createFromForm();
    if (dayTimeTable.id !== undefined) {
      this.subscribeToSaveResponse(this.dayTimeTableService.update(dayTimeTable));
    } else {
      this.subscribeToSaveResponse(this.dayTimeTableService.create(dayTimeTable));
    }
  }

  private createFromForm(): IDayTimeTable {
    const entity = {
      ...new DayTimeTable(),
      id: this.editForm.get(['id']).value,
      dayType: this.editForm.get(['dayType']).value,
      dayOfWeek: this.editForm.get(['dayOfWeek']).value,
      timeTableId: this.editForm.get(['timeTableId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDayTimeTable>>) {
    result.subscribe((res: HttpResponse<IDayTimeTable>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackTimeTableById(index: number, item: ITimeTable) {
    return item.id;
  }
}
