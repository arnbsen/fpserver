import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../time-table-wizard/time-table-wizard.component';

@Component({
  selector: 'jhi-device-id-dialog',
  templateUrl: './device-id-dialog.component.html',
  styles: []
})
export class DeviceIdDialogComponent {
  id: string;
  constructor(public dialogRef: MatDialogRef<DeviceIdDialogComponent>) {}
}
