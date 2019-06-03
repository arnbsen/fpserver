/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { DevfpserverTestModule } from '../../../test.module';
import { SubjectTimeTableUpdateComponent } from 'app/entities/subject-time-table/subject-time-table-update.component';
import { SubjectTimeTableService } from 'app/entities/subject-time-table/subject-time-table.service';
import { SubjectTimeTable } from 'app/shared/model/subject-time-table.model';

describe('Component Tests', () => {
  describe('SubjectTimeTable Management Update Component', () => {
    let comp: SubjectTimeTableUpdateComponent;
    let fixture: ComponentFixture<SubjectTimeTableUpdateComponent>;
    let service: SubjectTimeTableService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [SubjectTimeTableUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SubjectTimeTableUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubjectTimeTableUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubjectTimeTableService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SubjectTimeTable('123');
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
        const entity = new SubjectTimeTable();
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
