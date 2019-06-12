import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ISpecialOccasions, SpecialOccasions } from 'app/shared/model/special-occasions.model';
import { SpecialOccasionsService } from './special-occasions.service';
import { IAcademicSession } from 'app/shared/model/academic-session.model';
import { AcademicSessionService } from 'app/entities/academic-session';

@Component({
  selector: 'jhi-special-occasions-update',
  templateUrl: './special-occasions-update.component.html'
})
export class SpecialOccasionsUpdateComponent implements OnInit {
  specialOccasions: ISpecialOccasions;
  isSaving: boolean;

  academicsessions: IAcademicSession[];

  editForm = this.fb.group({
    id: [],
    date: [],
    type: [],
    description: [],
    academicSessionId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected specialOccasionsService: SpecialOccasionsService,
    protected academicSessionService: AcademicSessionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ specialOccasions }) => {
      this.updateForm(specialOccasions);
      this.specialOccasions = specialOccasions;
    });
    this.academicSessionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAcademicSession[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAcademicSession[]>) => response.body)
      )
      .subscribe((res: IAcademicSession[]) => (this.academicsessions = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(specialOccasions: ISpecialOccasions) {
    this.editForm.patchValue({
      id: specialOccasions.id,
      date: specialOccasions.date != null ? specialOccasions.date.format(DATE_TIME_FORMAT) : null,
      type: specialOccasions.type,
      description: specialOccasions.description,
      academicSessionId: specialOccasions.academicSessionId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const specialOccasions = this.createFromForm();
    if (specialOccasions.id !== undefined) {
      this.subscribeToSaveResponse(this.specialOccasionsService.update(specialOccasions));
    } else {
      this.subscribeToSaveResponse(this.specialOccasionsService.create(specialOccasions));
    }
  }

  private createFromForm(): ISpecialOccasions {
    const entity = {
      ...new SpecialOccasions(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      type: this.editForm.get(['type']).value,
      description: this.editForm.get(['description']).value,
      academicSessionId: this.editForm.get(['academicSessionId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpecialOccasions>>) {
    result.subscribe((res: HttpResponse<ISpecialOccasions>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackAcademicSessionById(index: number, item: IAcademicSession) {
    return item.id;
  }
}
