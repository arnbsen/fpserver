/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { DevfpserverTestModule } from '../../../test.module';
import { HODUpdateComponent } from 'app/entities/hod/hod-update.component';
import { HODService } from 'app/entities/hod/hod.service';
import { HOD } from 'app/shared/model/hod.model';

describe('Component Tests', () => {
  describe('HOD Management Update Component', () => {
    let comp: HODUpdateComponent;
    let fixture: ComponentFixture<HODUpdateComponent>;
    let service: HODService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [HODUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(HODUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HODUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HODService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new HOD('123');
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
        const entity = new HOD();
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
