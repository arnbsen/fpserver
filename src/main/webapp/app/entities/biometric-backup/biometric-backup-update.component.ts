import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IBiometricBackup, BiometricBackup } from 'app/shared/model/biometric-backup.model';
import { BiometricBackupService } from './biometric-backup.service';

@Component({
  selector: 'jhi-biometric-backup-update',
  templateUrl: './biometric-backup-update.component.html'
})
export class BiometricBackupUpdateComponent implements OnInit {
  biometricBackup: IBiometricBackup;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    forUserType: [],
    identifier: [],
    jsonFile: [],
    jsonFileContentType: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected biometricBackupService: BiometricBackupService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ biometricBackup }) => {
      this.updateForm(biometricBackup);
      this.biometricBackup = biometricBackup;
    });
  }

  updateForm(biometricBackup: IBiometricBackup) {
    this.editForm.patchValue({
      id: biometricBackup.id,
      forUserType: biometricBackup.forUserType,
      identifier: biometricBackup.identifier,
      jsonFile: biometricBackup.jsonFile,
      jsonFileContentType: biometricBackup.jsonFileContentType
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const biometricBackup = this.createFromForm();
    if (biometricBackup.id !== undefined) {
      this.subscribeToSaveResponse(this.biometricBackupService.update(biometricBackup));
    } else {
      this.subscribeToSaveResponse(this.biometricBackupService.create(biometricBackup));
    }
  }

  private createFromForm(): IBiometricBackup {
    const entity = {
      ...new BiometricBackup(),
      id: this.editForm.get(['id']).value,
      forUserType: this.editForm.get(['forUserType']).value,
      identifier: this.editForm.get(['identifier']).value,
      jsonFileContentType: this.editForm.get(['jsonFileContentType']).value,
      jsonFile: this.editForm.get(['jsonFile']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBiometricBackup>>) {
    result.subscribe((res: HttpResponse<IBiometricBackup>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
