import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITimeTable } from 'app/shared/model/time-table.model';

@Component({
  selector: 'jhi-time-table-detail',
  templateUrl: './time-table-detail.component.html'
})
export class TimeTableDetailComponent implements OnInit {
  timeTable: ITimeTable;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ timeTable }) => {
      this.timeTable = timeTable;
    });
  }

  previousState() {
    window.history.back();
  }
}
