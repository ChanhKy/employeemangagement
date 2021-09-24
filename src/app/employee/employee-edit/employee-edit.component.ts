import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Builder } from 'selenium-webdriver';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
import * as $ from "jquery"



@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  departments: Department[];
  idEdit: number;
  requiredDepart = 'Department not to blank';
  requiredName = 'Name not to blank';
  requiredGender = 'Gender not to blank';
  requiredDayOfbirth = 'Day of birth not to blank';
  requiredPhone = 'Phone number not to blank';
  requiredAddress = 'Address not to blank';
  requiredPosition = 'Position not to blank';
  requiredSalary = 'Salary not to blank';
  minlength = 'Enter at least 3 characters';
  maxlengthName = 'Max 50 characters ';
  maxlengthAddress = 'Max 255 characters ';
  maxlengthSalary = 'Max 10 digits ';
  pattern = 'Enter the letter';
  partternDT = 'Enter 10 digits - starting with 0';
  partternSalary = 'Enter 10 digits'

    employeeForm = new FormGroup({
    employeeId: new FormControl(''),
    employeeName: new FormControl(),
    employeeGender: new FormControl(),
    dayOfBirth: new FormControl(),
    employeePhone: new FormControl(),
    employeeAddress: new FormControl(),
    employeePosition: new FormControl(),
    employeeSalary: new FormControl(),
    employeeImg: new FormControl(""),
    department: new FormGroup({
      departmentId: new FormControl()
    })
  })



  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router,
    private activedRouter: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loopFocus();
    this.getDepartments();
    this.activedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      this.idEdit = parseInt(paramMap.get('employeeId'));
      this.employeeService.findById(this.idEdit).subscribe(employee => {
        this.employeeForm = new FormGroup({
          employeeId: new FormControl(employee.employeeId),
          employeeName: new FormControl(employee.employeeName, [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9 ._]{1,}$")]),
          employeeGender: new FormControl(employee.employeeGender, Validators.required),
          dayOfBirth: new FormControl(employee.dayOfBirth, Validators.required),
          employeePhone: new FormControl(employee.employeePhone, [Validators.required, Validators.pattern("^[0]\\d{9}$")]),
          employeeAddress: new FormControl(employee.employeeAddress, [Validators.required, Validators.maxLength(255)] ),
          employeePosition: new FormControl(employee.employeePosition, Validators.required ),
          employeeSalary: new FormControl(employee.employeeSalary, [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]+$")]),
          employeeImg: new FormControl(""),
          department: new FormGroup({
            departmentId: new FormControl(employee.department.departmentId, Validators.required)
          })
        })
      })
    })
  }

  getDepartments() {
    this.departmentService.getAllDepartment().subscribe(departments => {
      this.departments = departments;
    })
    // console.log(this.departments);

  }
  get employeeId() {
    return this.employeeForm.get('employeeId');
  }

  get employeeName() {
    return this.employeeForm.get('employeeName');
  }

  get employeeGender() {
    return this.employeeForm.get('employeeGender');
  }

  get dayOfBirth() {
    return this.employeeForm.get('dayOfBirth');
  }

  get employeePhone() {
    return this.employeeForm.get('employeePhone');
  }

  get employeeAddress() {
    return this.employeeForm.get('employeeAddress');
  }

  get employeePosition() {
    return this.employeeForm.get('employeePosition');
  }

  get employeeSalary() {
    return this.employeeForm.get('employeeSalary');
  }

  get department() {
    return this.employeeForm.get('department');
  }

  get departmentId() {
    return this.employeeForm.get('department').get('departmentId');
  }

  updateEmployee() {
    const employee = this.employeeForm.value;
    this.employeeService.updateEmployee(employee).subscribe(() => {
      this.router.navigateByUrl('employee/list');
    })
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log('form submited => ok');
      this.updateEmployee();
      this.toastr.success('Update employee successfull! ' ,'Success', {
        timeOut :  2000
      })
      // Swal.fire("Add employee successfull!", "You clicked the button", "success");
    } else {
      this.validateAllFormField(this.employeeForm);
      // Swal.fire("Add employee error! ", "You clicked the button", "error");
      this.toastr.error('Update employee fail', 'Warning', {
        timeOut :  2000
      });
    }
  }
  validateAllFormField(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        // console.log('field nay dang bi loi' + field);
        control.markAllAsTouched();////////////
      } else if (control instanceof FormGroup) {
        this.validateAllFormField(control);
      }
    })
  }

  resetForm() {
    this.employeeForm.reset();
  }

  loopFocus() {
    $("#employeeName").on("keydown", function (e) {
      if(e.keyCode == 9) {
        if(e.shiftKey) {
          e.preventDefault();
          $("#btn-edit").focus();
        }
      }
    })

    $("#btn-edit").on("keydown", function (e) {
      if(e.keyCode == 9) {
        if(!e.shiftKey) {
          e.preventDefault();
          $("#employeeName").focus();
        }
      }

    })
  }
}
