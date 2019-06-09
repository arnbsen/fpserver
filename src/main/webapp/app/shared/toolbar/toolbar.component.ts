import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginService } from 'app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-toolbar',
  templateUrl: './toolbar.component.html',
  styles: []
})
export class ToolbarComponent implements OnInit {
  @Output()
  openSidebar = new EventEmitter<boolean>();

  private openSidebarLocal = false;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  toggleSideNav() {
    this.openSidebarLocal = !this.openSidebarLocal;
    this.openSidebar.emit(this.openSidebarLocal);
  }
  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('login');
  }
}
