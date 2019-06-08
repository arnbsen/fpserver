import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
  errorMessage: string;
  error403: boolean;
  error404: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      if (routeData.error403) {
        this.error403 = routeData.error403;
        this.router.navigateByUrl('login');
      }
      if (routeData.error404) {
        this.error404 = routeData.error404;
      }
      if (routeData.errorMessage) {
        this.errorMessage = routeData.errorMessage;
      }
    });
  }
}
