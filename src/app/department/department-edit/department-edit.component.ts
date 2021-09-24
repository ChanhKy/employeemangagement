import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/service/department.service';
import * as $ from "jquery"


@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent implements OnInit {
  departments: Department;
  editForm: FormGroup;
  idEdit: number;
  reqiuredDes = 'Description not to blank';
  requiredDepart = 'Department not to blank';
  maxDepart = 'Max 50 characters';
  maxlength = 'Max 255 characters'
  patternDepart = 'Nhập chữ cái, số, dấu chấm và _/+#   ';

  constructor(private departmentService: DepartmentService,
              private activedRoute: ActivatedRoute,
              private formBuilder : FormBuilder,
              private router : Router,
              private toastr: ToastrService

    ) { }

  ngOnInit(): void {
    this.loopFocus();
    this.activedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.idEdit = parseInt(paramMap.get('departmentId'));

      console.log(this.idEdit);

      this.departmentService.findById(this.idEdit).subscribe(department => {
        this.editForm = new FormGroup ({
          departmentId : new FormControl(department.departmentId),
          departmentName : new FormControl(department.departmentName, [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9 ._/+#]{1,}$")]),
          description : new FormControl(department.description,[Validators.maxLength(255) ,Validators.required])
        })
      })
    })
  }

  get departmentName() {
    return this.editForm.get('departmentName');
  }

  get description() {
    return this.editForm.get('description');
  }

  updateDepartment() {
    const department = this.editForm.value;
    this.departmentService.updateDepartment(department).subscribe(() => {
      this.router.navigateByUrl('department/list');
    })
  }

  onSubmit() {
    if (this.editForm.valid) {
      console.log('form submited => ok');
      this.updateDepartment();
      this.toastr.success('Update department successfull! ', 'Success', {
        timeOut: 2000
      })
      // Swal.fire("Add employee successfull!", "You clicked the button", "success");
    } else {
      this.validateAllFormField(this.editForm);
      // Swal.fire("Add employee error! ", "You clicked the button", "error");
      this.toastr.error('Update department fail', 'Warning', {
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


  loopFocus() {
    $("#departmentName").on("keydown", function (e) {
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
          $("#departmentName").focus();
        }
      }

    })
  }

}
