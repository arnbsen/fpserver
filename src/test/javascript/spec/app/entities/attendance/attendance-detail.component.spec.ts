/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DevfpserverTestModule } from '../../../test.module';
import { AttendanceDetailComponent } from 'app/entities/attendance/attendance-detail.component';
import { Attendance } from 'app/shared/model/attendance.model';

describe('Component Tests', () => {
  describe('Attendance Management Detail Component', () => {
    let comp: AttendanceDetailComponent;
    let fixture: ComponentFixture<AttendanceDetailComponent>;
    const route = ({ data: of({ attendance: new Attendance('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [AttendanceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AttendanceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AttendanceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.attendance).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
