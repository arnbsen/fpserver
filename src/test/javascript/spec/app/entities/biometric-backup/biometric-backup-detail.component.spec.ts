/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DevfpserverTestModule } from '../../../test.module';
import { BiometricBackupDetailComponent } from 'app/entities/biometric-backup/biometric-backup-detail.component';
import { BiometricBackup } from 'app/shared/model/biometric-backup.model';

describe('Component Tests', () => {
  describe('BiometricBackup Management Detail Component', () => {
    let comp: BiometricBackupDetailComponent;
    let fixture: ComponentFixture<BiometricBackupDetailComponent>;
    const route = ({ data: of({ biometricBackup: new BiometricBackup('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [BiometricBackupDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BiometricBackupDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BiometricBackupDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.biometricBackup).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
