import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'jhi-toolbar',
  templateUrl: './toolbar.component.html',
  styles: []
})
export class ToolbarComponent implements OnInit {
  @Output()
  openSidebar = new EventEmitter<boolean>();

  private openSidebarLocal = false;
  constructor() {}

  ngOnInit() {}

  toggleSideNav() {
    this.openSidebarLocal = !this.openSidebarLocal;
    this.openSidebar.emit(this.openSidebarLocal);
  }
}
