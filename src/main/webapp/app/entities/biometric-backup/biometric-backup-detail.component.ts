import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IBiometricBackup } from 'app/shared/model/biometric-backup.model';

@Component({
  selector: 'jhi-biometric-backup-detail',
  templateUrl: './biometric-backup-detail.component.html'
})
export class BiometricBackupDetailComponent implements OnInit {
  biometricBackup: IBiometricBackup;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ biometricBackup }) => {
      this.biometricBackup = biometricBackup;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
