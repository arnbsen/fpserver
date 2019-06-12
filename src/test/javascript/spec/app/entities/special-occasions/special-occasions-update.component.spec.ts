/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { DevfpserverTestModule } from '../../../test.module';
import { SpecialOccasionsUpdateComponent } from 'app/entities/special-occasions/special-occasions-update.component';
import { SpecialOccasionsService } from 'app/entities/special-occasions/special-occasions.service';
import { SpecialOccasions } from 'app/shared/model/special-occasions.model';

describe('Component Tests', () => {
  describe('SpecialOccasions Management Update Component', () => {
    let comp: SpecialOccasionsUpdateComponent;
    let fixture: ComponentFixture<SpecialOccasionsUpdateComponent>;
    let service: SpecialOccasionsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [SpecialOccasionsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SpecialOccasionsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SpecialOccasionsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SpecialOccasionsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SpecialOccasions('123');
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
        const entity = new SpecialOccasions();
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
