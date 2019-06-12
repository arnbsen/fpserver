/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DevfpserverTestModule } from '../../../test.module';
import { AcademicSessionDeleteDialogComponent } from 'app/entities/academic-session/academic-session-delete-dialog.component';
import { AcademicSessionService } from 'app/entities/academic-session/academic-session.service';

describe('Component Tests', () => {
  describe('AcademicSession Management Delete Component', () => {
    let comp: AcademicSessionDeleteDialogComponent;
    let fixture: ComponentFixture<AcademicSessionDeleteDialogComponent>;
    let service: AcademicSessionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [AcademicSessionDeleteDialogComponent]
      })
        .overrideTemplate(AcademicSessionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AcademicSessionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AcademicSessionService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
