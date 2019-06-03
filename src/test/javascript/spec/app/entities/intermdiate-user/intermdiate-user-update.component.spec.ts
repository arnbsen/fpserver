/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { DevfpserverTestModule } from '../../../test.module';
import { IntermdiateUserUpdateComponent } from 'app/entities/intermdiate-user/intermdiate-user-update.component';
import { IntermdiateUserService } from 'app/entities/intermdiate-user/intermdiate-user.service';
import { IntermdiateUser } from 'app/shared/model/intermdiate-user.model';

describe('Component Tests', () => {
  describe('IntermdiateUser Management Update Component', () => {
    let comp: IntermdiateUserUpdateComponent;
    let fixture: ComponentFixture<IntermdiateUserUpdateComponent>;
    let service: IntermdiateUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [IntermdiateUserUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(IntermdiateUserUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IntermdiateUserUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IntermdiateUserService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new IntermdiateUser('123');
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
        const entity = new IntermdiateUser();
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
