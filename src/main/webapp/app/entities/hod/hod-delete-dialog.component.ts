import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHOD } from 'app/shared/model/hod.model';
import { HODService } from './hod.service';

@Component({
  selector: 'jhi-hod-delete-dialog',
  templateUrl: './hod-delete-dialog.component.html'
})
export class HODDeleteDialogComponent {
  hOD: IHOD;

  constructor(protected hODService: HODService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.hODService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'hODListModification',
        content: 'Deleted an hOD'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-hod-delete-popup',
  template: ''
})
export class HODDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ hOD }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(HODDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.hOD = hOD;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/hod', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/hod', { outlets: { popup: null } }]);
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
