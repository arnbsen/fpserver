import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAcademicSession } from 'app/shared/model/academic-session.model';

@Component({
  selector: 'jhi-academic-session-detail',
  templateUrl: './academic-session-detail.component.html'
})
export class AcademicSessionDetailComponent implements OnInit {
  academicSession: IAcademicSession;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ academicSession }) => {
      this.academicSession = academicSession;
    });
  }

  previousState() {
    window.history.back();
  }
}
