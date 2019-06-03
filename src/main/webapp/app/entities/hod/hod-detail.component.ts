import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHOD } from 'app/shared/model/hod.model';

@Component({
  selector: 'jhi-hod-detail',
  templateUrl: './hod-detail.component.html'
})
export class HODDetailComponent implements OnInit {
  hOD: IHOD;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ hOD }) => {
      this.hOD = hOD;
    });
  }

  previousState() {
    window.history.back();
  }
}
