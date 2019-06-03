import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubjectTimeTable } from 'app/shared/model/subject-time-table.model';

@Component({
  selector: 'jhi-subject-time-table-detail',
  templateUrl: './subject-time-table-detail.component.html'
})
export class SubjectTimeTableDetailComponent implements OnInit {
  subjectTimeTable: ISubjectTimeTable;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ subjectTimeTable }) => {
      this.subjectTimeTable = subjectTimeTable;
    });
  }

  previousState() {
    window.history.back();
  }
}
