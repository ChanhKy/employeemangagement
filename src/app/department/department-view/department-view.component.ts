import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Department } from 'src/app/model/department';
import { Employee } from 'src/app/model/employee';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.css']
})
export class DepartmentViewComponent implements OnInit {
  department: Department;
  employees: Employee[];
  idViewDepartment: number;

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((paramMap: ParamMap) => {
      this.idViewDepartment = parseInt(paramMap.get('departmentId'));

      this.departmentService.findById(this.idViewDepartment).subscribe(department => {
        this.department = department;
      })
    })

    this.activeRouter.paramMap.subscribe((paramMap: ParamMap) => {
      this.idViewDepartment = parseInt(paramMap.get('departmentId'));
      this.employeeService.findAllEmployeeByDepartmentId(this.idViewDepartment).subscribe(employees => {
        if(employees === null) {
          this.employees = [];
        }else {
          this.employees = employees;
        }
      })
    })
  }

}

