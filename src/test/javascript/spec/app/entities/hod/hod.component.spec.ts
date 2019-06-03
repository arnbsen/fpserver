/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DevfpserverTestModule } from '../../../test.module';
import { HODComponent } from 'app/entities/hod/hod.component';
import { HODService } from 'app/entities/hod/hod.service';
import { HOD } from 'app/shared/model/hod.model';

describe('Component Tests', () => {
  describe('HOD Management Component', () => {
    let comp: HODComponent;
    let fixture: ComponentFixture<HODComponent>;
    let service: HODService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [HODComponent],
        providers: []
      })
        .overrideTemplate(HODComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HODComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HODService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new HOD('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.hODS[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
