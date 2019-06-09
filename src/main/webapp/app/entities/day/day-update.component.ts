import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IDay, Day } from 'app/shared/model/day.model';
import { DayService } from './day.service';

@Component({
  selector: 'jhi-day-update',
  templateUrl: './day-update.component.html'
})
export class DayUpdateComponent implements OnInit {
  day: IDay;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    type: [],
    dayOfTheWeek: [],
    date: []
  });

  constructor(protected dayService: DayService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ day }) => {
      this.updateForm(day);
      this.day = day;
    });
  }

  updateForm(day: IDay) {
    this.editForm.patchValue({
      id: day.id,
      type: day.type,
      dayOfTheWeek: day.dayOfTheWeek,
      date: day.date != null ? day.date.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const day = this.createFromForm();
    if (day.id !== undefined) {
      this.subscribeToSaveResponse(this.dayService.update(day));
    } else {
      this.subscribeToSaveResponse(this.dayService.create(day));
    }
  }

  private createFromForm(): IDay {
    const entity = {
      ...new Day(),
      id: this.editForm.get(['id']).value,
      type: this.editForm.get(['type']).value,
      dayOfTheWeek: this.editForm.get(['dayOfTheWeek']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDay>>) {
    result.subscribe((res: HttpResponse<IDay>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
