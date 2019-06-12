import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IAcademicSession, AcademicSession } from 'app/shared/model/academic-session.model';
import { AcademicSessionService } from './academic-session.service';

@Component({
  selector: 'jhi-academic-session-update',
  templateUrl: './academic-session-update.component.html'
})
export class AcademicSessionUpdateComponent implements OnInit {
  academicSession: IAcademicSession;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    academicSession: [],
    startDate: [],
    endDate: []
  });

  constructor(
    protected academicSessionService: AcademicSessionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ academicSession }) => {
      this.updateForm(academicSession);
      this.academicSession = academicSession;
    });
  }

  updateForm(academicSession: IAcademicSession) {
    this.editForm.patchValue({
      id: academicSession.id,
      academicSession: academicSession.academicSession,
      startDate: academicSession.startDate != null ? academicSession.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: academicSession.endDate != null ? academicSession.endDate.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const academicSession = this.createFromForm();
    if (academicSession.id !== undefined) {
      this.subscribeToSaveResponse(this.academicSessionService.update(academicSession));
    } else {
      this.subscribeToSaveResponse(this.academicSessionService.create(academicSession));
    }
  }

  private createFromForm(): IAcademicSession {
    const entity = {
      ...new AcademicSession(),
      id: this.editForm.get(['id']).value,
      academicSession: this.editForm.get(['academicSession']).value,
      startDate:
        this.editForm.get(['startDate']).value != null ? moment(this.editForm.get(['startDate']).value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate']).value != null ? moment(this.editForm.get(['endDate']).value, DATE_TIME_FORMAT) : undefined
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcademicSession>>) {
    result.subscribe((res: HttpResponse<IAcademicSession>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
