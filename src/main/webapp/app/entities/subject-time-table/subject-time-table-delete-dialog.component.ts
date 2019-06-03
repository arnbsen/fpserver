import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubjectTimeTable } from 'app/shared/model/subject-time-table.model';
import { SubjectTimeTableService } from './subject-time-table.service';

@Component({
  selector: 'jhi-subject-time-table-delete-dialog',
  templateUrl: './subject-time-table-delete-dialog.component.html'
})
export class SubjectTimeTableDeleteDialogComponent {
  subjectTimeTable: ISubjectTimeTable;

  constructor(
    protected subjectTimeTableService: SubjectTimeTableService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.subjectTimeTableService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'subjectTimeTableListModification',
        content: 'Deleted an subjectTimeTable'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-subject-time-table-delete-popup',
  template: ''
})
export class SubjectTimeTableDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ subjectTimeTable }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SubjectTimeTableDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.subjectTimeTable = subjectTimeTable;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/subject-time-table', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/subject-time-table', { outlets: { popup: null } }]);
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
