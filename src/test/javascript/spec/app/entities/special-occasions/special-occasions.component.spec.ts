/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DevfpserverTestModule } from '../../../test.module';
import { SpecialOccasionsComponent } from 'app/entities/special-occasions/special-occasions.component';
import { SpecialOccasionsService } from 'app/entities/special-occasions/special-occasions.service';
import { SpecialOccasions } from 'app/shared/model/special-occasions.model';

describe('Component Tests', () => {
  describe('SpecialOccasions Management Component', () => {
    let comp: SpecialOccasionsComponent;
    let fixture: ComponentFixture<SpecialOccasionsComponent>;
    let service: SpecialOccasionsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [SpecialOccasionsComponent],
        providers: []
      })
        .overrideTemplate(SpecialOccasionsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SpecialOccasionsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SpecialOccasionsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SpecialOccasions('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.specialOccasions[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
