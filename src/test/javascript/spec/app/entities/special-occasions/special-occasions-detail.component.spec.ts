/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DevfpserverTestModule } from '../../../test.module';
import { SpecialOccasionsDetailComponent } from 'app/entities/special-occasions/special-occasions-detail.component';
import { SpecialOccasions } from 'app/shared/model/special-occasions.model';

describe('Component Tests', () => {
  describe('SpecialOccasions Management Detail Component', () => {
    let comp: SpecialOccasionsDetailComponent;
    let fixture: ComponentFixture<SpecialOccasionsDetailComponent>;
    const route = ({ data: of({ specialOccasions: new SpecialOccasions('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [SpecialOccasionsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SpecialOccasionsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SpecialOccasionsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.specialOccasions).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
