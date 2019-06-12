import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISpecialOccasions } from 'app/shared/model/special-occasions.model';
import { SpecialOccasionsService } from './special-occasions.service';

@Component({
  selector: 'jhi-special-occasions-delete-dialog',
  templateUrl: './special-occasions-delete-dialog.component.html'
})
export class SpecialOccasionsDeleteDialogComponent {
  specialOccasions: ISpecialOccasions;

  constructor(
    protected specialOccasionsService: SpecialOccasionsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.specialOccasionsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'specialOccasionsListModification',
        content: 'Deleted an specialOccasions'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-special-occasions-delete-popup',
  template: ''
})
export class SpecialOccasionsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ specialOccasions }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SpecialOccasionsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.specialOccasions = specialOccasions;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/special-occasions', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/special-occasions', { outlets: { popup: null } }]);
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
