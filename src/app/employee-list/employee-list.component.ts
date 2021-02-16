import {Component, OnInit} from '@angular/core';
import { UnsubscriptionError } from 'rxjs';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe((emps) => this.employees = emps);
  }

  // Calls service to save edits to employee.
  onEdit (emp) : void {
    this.employeeService.save(emp).subscribe();
  }

  // Calls service to remove employee from db.
  onDelete (emp) : void {
    // Tell DB service to remove employee.
    this.employeeService.remove(emp).subscribe();
    
    // Client-side, filter out removed employee from direct reports and overall list.
    this.employees = this.employees
      .map((e) => {
        if (e.directReports !== undefined) {
          e.directReports = e.directReports?.filter((id) => id !== emp.id);

          // If directReports is empty, remove property.
          if (e.directReports?.length < 1) {
            delete(e.directReports);
          }
        }

        return e;
      })
      .filter((e) => e.id !== emp.id);
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
