/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DevfpserverTestModule } from '../../../test.module';
import { DayTimeTableDetailComponent } from 'app/entities/day-time-table/day-time-table-detail.component';
import { DayTimeTable } from 'app/shared/model/day-time-table.model';

describe('Component Tests', () => {
  describe('DayTimeTable Management Detail Component', () => {
    let comp: DayTimeTableDetailComponent;
    let fixture: ComponentFixture<DayTimeTableDetailComponent>;
    const route = ({ data: of({ dayTimeTable: new DayTimeTable('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [DayTimeTableDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DayTimeTableDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DayTimeTableDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dayTimeTable).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
