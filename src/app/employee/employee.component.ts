import {Component, Input} from '@angular/core';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employee: Employee;
  employeesThatReport: Array<Employee> = [];

  constructor(private employeeService: EmployeeService) {
  }

  // On component intialization
  ngOnInit() {
    // If directReports exist, get all employee info of each.
    if (this.employee.directReports !== undefined) {
      this.employee.directReports.forEach((employeeId) => {
        this.employeeService.get(employeeId).subscribe(emp => this.employeesThatReport.push(emp));
      });
    }
  }
}
