import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, LoginService } from 'app/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  constructor(protected router: Router, protected loginService: LoginService, private _snackBar: MatSnackBar) {}

  ngOnInit() {}

  openSettingsNav() {
    this.router.navigate(['/settings', 'admin']);
  }

  openCalendar() {
    this.router.navigate(['/special-occasions', 'view']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  goHome() {
    this.router.navigateByUrl('home');
  }
}
