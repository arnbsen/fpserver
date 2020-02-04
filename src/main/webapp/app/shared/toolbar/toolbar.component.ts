import { Component, OnInit, EventEmitter, Output, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { LoginService } from 'app/core';
import { Router } from '@angular/router';
import { ToolbarService } from './toolbar.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'jhi-toolbar',
  templateUrl: './toolbar.component.html',
  styles: []
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Output()
  openSidebar = new EventEmitter<boolean>();

  @Output()
  openSettings = new EventEmitter<any>();

  userParams: { id?: string; role?: string };

  studentDetails: { year?: number; semester?: number; department?: string };

  private openSidebarLocal = false;
  constructor(private loginService: LoginService, private router: Router, private toolbarService: ToolbarService) {}

  ngOnInit() {
    this.userParams = this.toolbarService.getUserParams();
  }

  ngOnDestroy(): void {}

  toggleSideNav() {
    this.openSidebarLocal = !this.openSidebarLocal;
    this.openSidebar.emit(this.openSidebarLocal);
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  openSettingsNav() {
    this.router.navigate(['/settings', this.userParams.role, this.userParams.id]);
  }

  openCalendar() {
    this.router.navigate(['/special-occasions', 'view']);
  }

  goHome() {
    this.router.navigateByUrl('home');
  }

  goToTimeTable() {
    this.studentDetails = this.toolbarService.getstudentDetails();
    this.router.navigate(['/time-table', this.studentDetails.department, this.studentDetails.year, this.studentDetails.semester, 'view']);
  }
}
