import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TimeTableMetaDataDialogComponent } from './time-table-wizard.metadata';
import { ITimeTable } from 'app/shared/model/time-table.model';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'jhi-time-table-wizard',
  templateUrl: './time-table-wizard.component.html',
  styles: []
})
export class TimeTableWizardComponent implements OnInit {
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  holiday = [];
  topRow = [
    { span: 7, header: 'Day' },
    { span: 12, header: 'Class 1' },
    { span: 12, header: 'Class 2' },
    { span: 12, header: 'Class 3' },
    { span: 12, header: 'Class 4' },
    { span: 9, header: 'AAL' },
    { span: 12, header: 'Class 5' },
    { span: 12, header: 'Class 6' },
    { span: 12, header: 'Class 7' }
  ];
  timeTable: ITimeTable;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TimeTableMetaDataDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  appendToSpanArray() {
    this.holiday.push(93);
  }
}
