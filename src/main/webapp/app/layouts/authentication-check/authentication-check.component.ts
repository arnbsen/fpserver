import { Component, OnInit } from '@angular/core';
import { AccountService, StateStorageService } from 'app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-authentication-check',
  templateUrl: './authentication-check.component.html',
  styles: []
})
export class AuthenticationCheckComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router, private stateStorageService: StateStorageService) {}

  ngOnInit() {
    if (this.accountService.isAuthenticated()) {
    } else {
      this.router.navigateByUrl('login');
    }
  }
}
