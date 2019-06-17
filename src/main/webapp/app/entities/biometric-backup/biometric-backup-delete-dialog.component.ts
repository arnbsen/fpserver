import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBiometricBackup } from 'app/shared/model/biometric-backup.model';
import { BiometricBackupService } from './biometric-backup.service';

@Component({
  selector: 'jhi-biometric-backup-delete-dialog',
  templateUrl: './biometric-backup-delete-dialog.component.html'
})
export class BiometricBackupDeleteDialogComponent {
  biometricBackup: IBiometricBackup;

  constructor(
    protected biometricBackupService: BiometricBackupService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.biometricBackupService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'biometricBackupListModification',
        content: 'Deleted an biometricBackup'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-biometric-backup-delete-popup',
  template: ''
})
export class BiometricBackupDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ biometricBackup }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BiometricBackupDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.biometricBackup = biometricBackup;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/biometric-backup', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/biometric-backup', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
