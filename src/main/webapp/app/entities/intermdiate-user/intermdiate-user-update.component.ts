import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IIntermdiateUser, IntermdiateUser } from 'app/shared/model/intermdiate-user.model';
import { IntermdiateUserService } from './intermdiate-user.service';

@Component({
  selector: 'jhi-intermdiate-user-update',
  templateUrl: './intermdiate-user-update.component.html'
})
export class IntermdiateUserUpdateComponent implements OnInit {
  intermdiateUser: IIntermdiateUser;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    deviceUserName: [null, [Validators.required]],
    hardwareID: [null, [Validators.required]],
    otherParams: []
  });

  constructor(
    protected intermdiateUserService: IntermdiateUserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ intermdiateUser }) => {
      this.updateForm(intermdiateUser);
      this.intermdiateUser = intermdiateUser;
    });
  }

  updateForm(intermdiateUser: IIntermdiateUser) {
    this.editForm.patchValue({
      id: intermdiateUser.id,
      deviceUserName: intermdiateUser.deviceUserName,
      hardwareID: intermdiateUser.hardwareID,
      otherParams: intermdiateUser.otherParams
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const intermdiateUser = this.createFromForm();
    if (intermdiateUser.id !== undefined) {
      this.subscribeToSaveResponse(this.intermdiateUserService.update(intermdiateUser));
    } else {
      this.subscribeToSaveResponse(this.intermdiateUserService.create(intermdiateUser));
    }
  }

  private createFromForm(): IIntermdiateUser {
    const entity = {
      ...new IntermdiateUser(),
      id: this.editForm.get(['id']).value,
      deviceUserName: this.editForm.get(['deviceUserName']).value,
      hardwareID: this.editForm.get(['hardwareID']).value,
      otherParams: this.editForm.get(['otherParams']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIntermdiateUser>>) {
    result.subscribe((res: HttpResponse<IIntermdiateUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
