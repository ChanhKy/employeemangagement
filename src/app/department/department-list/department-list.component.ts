import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/service/department.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[];
  idDelete: number;
  departmentForm: FormGroup;
  searchDepartment: '';

  totalPages: number;
  totalElements: number;

  departmentSearchArg: any = {
    pageNumber: 1,
    pageSize: 5,
    search: ""
  }

  constructor(private departmentService: DepartmentService,
    private toasrt: ToastrService) {
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(object?) {
    // this.departmentService.getAll().subscribe(departments => {
    //   this.departments = departments;
    // })
    if (object) {
      this.departmentSearchArg = object;
    }

    if (this.searchDepartment) {
      object.search = this.searchDepartment;
    }
    console.log(object);

    this.departmentService.getPaging(object).subscribe(departments => {
      if (departments) {
        this.departments = departments.content;
        this.totalPages = departments.totalPages;
        this.totalElements = departments.totalElements
      } else {
        this.departments = []
      }
    })
  }

  searchAll() {
    this.departmentSearchArg.search = this.searchDepartment;
    this.getDepartments(this.departmentSearchArg);
  }


  changeId(id: number) {
    this.idDelete = id;
    console.log('Id de xoa la: ' + this.idDelete);
    this.confirmDelete();
  }
  // deleteModal() {
  //   this.departmentService.deleteDepartment(this.idDelete).subscribe(() => {
  //     this.getDepartments();
  //   })
  // }

  async confirmDelete() {
    let check = true;
    await this.departmentService.findById(this.idDelete).toPromise()
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
              this.getDepartments();
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
          this.departmentService.deleteDepartment(this.idDelete).subscribe(
            emp => {
              if (emp == 1) {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                this.getDepartments();
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

  removeInput(){
    this.searchDepartment = '';
    this.getDepartments();
  }
}
