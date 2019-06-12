/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { DevfpserverTestModule } from '../../../test.module';
import { AcademicSessionUpdateComponent } from 'app/entities/academic-session/academic-session-update.component';
import { AcademicSessionService } from 'app/entities/academic-session/academic-session.service';
import { AcademicSession } from 'app/shared/model/academic-session.model';

describe('Component Tests', () => {
  describe('AcademicSession Management Update Component', () => {
    let comp: AcademicSessionUpdateComponent;
    let fixture: ComponentFixture<AcademicSessionUpdateComponent>;
    let service: AcademicSessionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [AcademicSessionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AcademicSessionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AcademicSessionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AcademicSessionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AcademicSession('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new AcademicSession();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
