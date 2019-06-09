/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DevfpserverTestModule } from '../../../test.module';
import { AttendanceComponent } from 'app/entities/attendance/attendance.component';
import { AttendanceService } from 'app/entities/attendance/attendance.service';
import { Attendance } from 'app/shared/model/attendance.model';

describe('Component Tests', () => {
  describe('Attendance Management Component', () => {
    let comp: AttendanceComponent;
    let fixture: ComponentFixture<AttendanceComponent>;
    let service: AttendanceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [AttendanceComponent],
        providers: []
      })
        .overrideTemplate(AttendanceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AttendanceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AttendanceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Attendance('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.attendances[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
