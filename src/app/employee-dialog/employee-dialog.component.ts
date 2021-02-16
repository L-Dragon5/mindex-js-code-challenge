import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {Employee} from '../employee';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent {
  dialogType : string = "";
  employee : Employee;

  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string, employee: Employee}) {
      this.dialogType = data.type;
      this.employee = data.employee;
  }

  onCancelClick () : void {
    this.dialogRef.close();
  }
}
