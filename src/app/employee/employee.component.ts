import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employee: Employee;
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  employeesThatReport: Employee[] = [];

  constructor(private employeeService: EmployeeService) {
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
    this.edit.emit(emp);
  }

  // When delete button is pressed, emit delete to Employee List.
  onDeleteClick (emp) : void {
    this.delete.emit(emp);
  }
}
