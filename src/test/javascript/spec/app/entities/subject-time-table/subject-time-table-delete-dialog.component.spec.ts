/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DevfpserverTestModule } from '../../../test.module';
import { SubjectTimeTableDeleteDialogComponent } from 'app/entities/subject-time-table/subject-time-table-delete-dialog.component';
import { SubjectTimeTableService } from 'app/entities/subject-time-table/subject-time-table.service';

describe('Component Tests', () => {
  describe('SubjectTimeTable Management Delete Component', () => {
    let comp: SubjectTimeTableDeleteDialogComponent;
    let fixture: ComponentFixture<SubjectTimeTableDeleteDialogComponent>;
    let service: SubjectTimeTableService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [SubjectTimeTableDeleteDialogComponent]
      })
        .overrideTemplate(SubjectTimeTableDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubjectTimeTableDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubjectTimeTableService);
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
