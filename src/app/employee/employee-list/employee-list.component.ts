import { Component, OnInit } from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import Swal from 'sweetalert2';
import * as $ from "jquery"



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  employee: Employee;
  IdDelete: number;
  searchEmployee = '';

  totalPages: number;
  totalElements: number;

  employeeSearchArg: any = {
    pageNumber: 1,
    pageSize: 5,
    search: "",
  }

  // page = 0;
  // pages: Array<any> = [];
  // sort = 'employee_id';

  constructor(private employeeService: EmployeeService,
    private toasrt: ToastrService

  ) {
  }

  ngOnInit(): void {
    this.loopFocus();
    this.getEmployees();
  }

  // getEmployees() {
  //   this.employeeService.getAll1(this.search, this.page).subscribe(employees => {
  //     if (employees === null) {
  //       this.employees = [];
  //     }
  //     this.employees = employees.content;
  //     this.pages = new Array<any>(employees.totalPages);
  //   })
  // }

  getEmployees(object?) {
    // this.departmentService.getAll().subscribe(departments => {
    //   this.departments = departments;
    // })
    if (object) {
      this.employeeSearchArg = object;
    }
    // console.log(object);
    if (this.searchEmployee) {
      object.search = this.searchEmployee;
    }
    this.employeeService.getPaging(object).subscribe(employees => {
      if (employees) {
        this.employees = employees.content;
        this.totalPages = employees.totalPages;
        this.totalElements = employees.totalElements;
      } else {
        this.employees = [];
      }
    })
  }

  searchAll() {
    this.employeeSearchArg.search = this.searchEmployee;
    this.getEmployees(this.employeeSearchArg);
  }

  changeId(id: number) {
    this.IdDelete = id;
    console.log(this.IdDelete);
    if (this.IdDelete == null) {
      this.toasrt.error('Employee not exists', ' error');
    } else {
      this.confirmDelete();
    }

  }

  // deleteModal() {
  //   this.employeeService.deleteEmployee(this.IdDelete).subscribe(
  //     emp => {
  //       if(emp == 1 ) {
  //         this.getEmployees();
  //       } else if (emp == 0) {
  //         alert('Employee nay da bi xoa');
  //       }
  //     },
  //     err => console.log(err)
  //   )
  // }



  async confirmDelete() {
    let check = true;
    await this.employeeService.findById(this.IdDelete).toPromise()
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
        if (err.status == 404) {
          check = false;
          Swal.fire({
            title: 'Are you want to reload page?',
            text: "This item was deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reload page !'
          }).then((result) => {
            if (result.isConfirmed) {
              this.getEmployees();
            }
          })
        }
      })
    if (check) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.employeeService.deleteEmployee(this.IdDelete).subscribe(
            emp => {
              if (emp == 1) {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                this.getEmployees();
              }
              else if (emp == 0) {
                this.toasrt.error('Employee not exists', ' error');
              }
            },
            err => console.log(err)
          )
        }
      })
    }
  }
  loopFocus() {
    $("#search").on("keydown", function (e) {
      if(e.keyCode == 9) {
        if(e.shiftKey) {
          e.preventDefault();
          $("#btn-delete").focus();
        }
      }
    })

    $("#btn-delete").on("keydown", function (e) {
      if(e.keyCode == 9) {
        if(!e.shiftKey) {
          e.preventDefault();
          $("#search").focus();
        }
      }

    })
  }


  removeInput() {
    this.searchEmployee = '';
    this.getEmployees();
  }
}
