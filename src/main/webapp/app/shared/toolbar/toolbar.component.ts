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

  private subs: Subscription;
  private subs2: Subscription;
  userParams: { id?: string; role?: string };

  studentDetails: { year?: number; semester?: number; department?: string };

  private openSidebarLocal = false;
  constructor(private loginService: LoginService, private router: Router, private toolbarService: ToolbarService) {}

  ngOnInit() {
    this.subs = this.toolbarService.getUserParams().subscribe((val: any) => {
      this.userParams = val;
    });
    this.subs2 = this.toolbarService.getstudentDetails().subscribe((val: any) => {
      this.studentDetails = val;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.subs2.unsubscribe();
  }

  toggleSideNav() {
    this.openSidebarLocal = !this.openSidebarLocal;
    this.openSidebar.emit(this.openSidebarLocal);
  }
  logout() {
    this.toolbarService.studentParamsObs.next(null);
    this.toolbarService.userParamsObs.next(null);
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
    this.router.navigate(['/time-table', this.studentDetails.department, this.studentDetails.year, this.studentDetails.semester, 'view']);
  }
}
