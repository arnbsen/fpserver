import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from './time-table-wizard.component';

@Component({
  selector: 'jhi-time-table-metadata-dialog',
  templateUrl: 'time-table-wizard.metadata.html'
})
export class TimeTableMetaDataDialogComponent {
  dialogData: DialogData = {
    year: 1,
    semester: 1
  };
  getSemester(val: number): number[] {
    return [val * 2 - 1, val * 2];
  }
}
