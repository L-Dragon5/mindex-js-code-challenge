import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import {EmployeeDialogComponent} from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  employeesThatReport: Employee[] = [];

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {
  }

  // On component intialization
  ngOnInit () : void {
    // If directReports exist, get all employee info of each.
    if (this.employee.directReports !== undefined) {
      this.employee.directReports.forEach((employeeId) => {
        this.employeeService.get(employeeId).subscribe(emp => this.employeesThatReport.push(emp));
      });
    }
  }

  // When edit button is pressed, emit edit to Employee List.
  onEditClick (emp) : void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '400px',
      data: {
        employee: emp,
        type: 'edit',
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.edit.emit(data);
      }
    });
  }

  // When delete button is pressed, emit delete to Employee List.
  onDeleteClick (emp) : void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '400px',
      data: {
        employee: emp,
        type: 'delete',
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.delete.emit(emp);
      }
    });
  }
}
