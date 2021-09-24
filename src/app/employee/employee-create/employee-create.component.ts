import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/model/department';
import { Employee } from 'src/app/model/employee';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
import * as $ from "jquery"

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  departments: Department[];
  employeeForm: FormGroup;
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
  messageDuplicate = 'Name has been duplicated ';




  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router,
    private toastr: ToastrService,


  ) { }

  ngOnInit() {
    this.loopFocus();
    this.getDepartments();
    this.employeeForm = new FormGroup({
      employeeId: new FormControl(),
      employeeName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9 ._]{1,}$")]),
      employeeGender: new FormControl("", Validators.required),
      dayOfBirth: new FormControl("", Validators.required),
      employeePhone: new FormControl("", [Validators.required, Validators.pattern("^[0]\\d{9}$")]),
      employeeAddress: new FormControl("", [Validators.required, Validators.maxLength(255)]),
      employeePosition: new FormControl("", Validators.required),
      employeeSalary: new FormControl("", [Validators.required, Validators.maxLength(10),Validators.pattern("^[0-9]+$")]),
      department: new FormGroup({
        departmentId: new FormControl("", Validators.required)
      }
      )
    })
  }
  inputName: string;
  empl : Employee;
  checkDuplicate(name:string){
    this.employeeService.getEmployeeByName(name).subscribe(employee => {
      this.empl = employee;
      if(this.empl != null) {
        // this.toastr.error('Name has dupcate', 'error');
        this.employeeName.setErrors({isDuplicate:true})
      }
    })
  }


  getDepartments() {
    this.departmentService.getAllDepartment().subscribe(departments => {
      this.departments = departments;
    })
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

  saveEmployee() {
    const employee = this.employeeForm.value;
    this.employeeService.saveEmployee(employee).subscribe(() => {
      this.router.navigateByUrl('employee/list')
    }, e => {
      console.log(e);
      alert("Create fail :(  ");
    })
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log('form submited => ok');
      this.saveEmployee();
      this.toastr.success('Add employee successfull! ' ,'Success', {
        timeOut :  2000
      })
      // Swal.fire("Add employee successfull!", "You clicked the button", "success");
    } else {
      this.validateAllFormField(this.employeeForm);
      // Swal.fire("Add employee error! ", "You clicked the button", "error");
      this.toastr.error('Add employee fail', 'Warning', {
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
    this.getDepartments();
  }

  loopFocus() {
    $("#employeeName").on("keydown", function (e) {
      if(e.keyCode == 9) {
        if(e.shiftKey) {
          e.preventDefault();
          $("#btn-add").focus();
        }
      }
    })

    $("#btn-add").on("keydown", function (e) {
      if(e.keyCode == 9) {
        if(!e.shiftKey) {
          e.preventDefault();
          $("#employeeName").focus();
        }
      }

    })
  }



}
