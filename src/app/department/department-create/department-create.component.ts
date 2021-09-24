import { DOCUMENT } from '@angular/common';
import { Component, Inject, INJECTOR, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/service/department.service';
import * as $ from "jquery"


@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {
  departmentForm: FormGroup;
  reqiuredDes = 'Description not to blank';
  requiredDepart = 'Department not to blank';
  maxDepart = 'Max 50 characters';
  maxlength = 'Max 255 characters'
  patternDepart = 'Enter character, digits,and ._/+#   ';
  messageDuplicate = 'Name has been duplicated ';

  constructor(private departmentService: DepartmentService,
    private router: Router,
    private toastr: ToastrService) {

  }

  ngOnInit() {
    this.loopFocus();
    this.departmentForm = new FormGroup({
      departmentName: new FormControl("", [Validators.required,Validators.maxLength(50) , Validators.pattern("^[a-zA-Z0-9 ._/+#]{1,}$")]),
      description: new FormControl("", [Validators.required, Validators.maxLength(255)])
    })
  }

  inputName: string;
  depart : Department;
  checkDuplicate(name:string){
    this.departmentService.getDepartmentByName(name).subscribe(department => {
      this.depart = department;
      if(this.depart != null) {
        // this.toastr.error('Name has dupcate', 'error');
        this.departmentName.setErrors({isDuplicate:true})
      }
    })
  }

  get departmentName() {
    return this.departmentForm.get('departmentName');
  }

  get description() {
    return this.departmentForm.get('description');
  }



  saveDepartment() {
    const department = this.departmentForm.value;
    this.departmentService.saveDepartment(department).subscribe(() => {
      this.router.navigateByUrl('department/list');
    })
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      console.log('form submited => ok');
      this.saveDepartment();
      this.toastr.success('Add department successfull! ', 'Success', {
        timeOut: 2000
      })
      // Swal.fire("Add employee successfull!", "You clicked the button", "success");
    } else {
      this.validateAllFormField(this.departmentForm);
      // Swal.fire("Add employee error! ", "You clicked the button", "error");
      this.toastr.error('Add department fail', 'Warning', {
        timeOut: 2000
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
    this.departmentForm.reset();
  }

  loopFocus() {
    $("#departmentName").on("keydown", function (e) {
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
          $("#departmentName").focus();
        }
      }

    })
  }
}
