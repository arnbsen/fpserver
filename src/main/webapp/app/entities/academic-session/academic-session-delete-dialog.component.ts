import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAcademicSession } from 'app/shared/model/academic-session.model';
import { AcademicSessionService } from './academic-session.service';

@Component({
  selector: 'jhi-academic-session-delete-dialog',
  templateUrl: './academic-session-delete-dialog.component.html'
})
export class AcademicSessionDeleteDialogComponent {
  academicSession: IAcademicSession;

  constructor(
    protected academicSessionService: AcademicSessionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.academicSessionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'academicSessionListModification',
        content: 'Deleted an academicSession'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-academic-session-delete-popup',
  template: ''
})
export class AcademicSessionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ academicSession }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AcademicSessionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.academicSession = academicSession;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/academic-session', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/academic-session', { outlets: { popup: null } }]);
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
