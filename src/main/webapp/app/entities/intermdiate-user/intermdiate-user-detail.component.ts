import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIntermdiateUser } from 'app/shared/model/intermdiate-user.model';

@Component({
  selector: 'jhi-intermdiate-user-detail',
  templateUrl: './intermdiate-user-detail.component.html'
})
export class IntermdiateUserDetailComponent implements OnInit {
  intermdiateUser: IIntermdiateUser;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ intermdiateUser }) => {
      this.intermdiateUser = intermdiateUser;
    });
  }

  previousState() {
    window.history.back();
  }
}
