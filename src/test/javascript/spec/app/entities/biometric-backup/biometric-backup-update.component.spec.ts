/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { DevfpserverTestModule } from '../../../test.module';
import { BiometricBackupUpdateComponent } from 'app/entities/biometric-backup/biometric-backup-update.component';
import { BiometricBackupService } from 'app/entities/biometric-backup/biometric-backup.service';
import { BiometricBackup } from 'app/shared/model/biometric-backup.model';

describe('Component Tests', () => {
  describe('BiometricBackup Management Update Component', () => {
    let comp: BiometricBackupUpdateComponent;
    let fixture: ComponentFixture<BiometricBackupUpdateComponent>;
    let service: BiometricBackupService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [BiometricBackupUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BiometricBackupUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BiometricBackupUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BiometricBackupService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new BiometricBackup('123');
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
        const entity = new BiometricBackup();
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
