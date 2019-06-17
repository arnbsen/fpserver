/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DevfpserverTestModule } from '../../../test.module';
import { BiometricBackupComponent } from 'app/entities/biometric-backup/biometric-backup.component';
import { BiometricBackupService } from 'app/entities/biometric-backup/biometric-backup.service';
import { BiometricBackup } from 'app/shared/model/biometric-backup.model';

describe('Component Tests', () => {
  describe('BiometricBackup Management Component', () => {
    let comp: BiometricBackupComponent;
    let fixture: ComponentFixture<BiometricBackupComponent>;
    let service: BiometricBackupService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [BiometricBackupComponent],
        providers: []
      })
        .overrideTemplate(BiometricBackupComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BiometricBackupComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BiometricBackupService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new BiometricBackup('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.biometricBackups[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
