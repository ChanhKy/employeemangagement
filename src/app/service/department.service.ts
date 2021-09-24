import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Department } from "../model/department";
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn:'root'
})

export class DepartmentService {
  constructor (private http : HttpClient) {}



  getPaging(object?): Observable<any>{
    if(object) {
      if(object.search) {
        return this.http.get(`${API_URL}/list?search=${object.search}&pageSize=${object.pageSize}&pageNumber=${object.pageNumber}`)
      }
      return this.http.get(`${API_URL}/list?pageSize=${object.pageSize}&pageNumber=${object.pageNumber}`)
    }
    return this.http.get(`${API_URL}/list`);
  }

  getAll(search: string, page:number):Observable<Department[]> {
    return this.http.get<Department[]>(API_URL + '/list1' + '?search='+search + '&page='+page);
  }

  getAllDepartment():Observable<Department[]> {
    return this.http.get<Department[]>(API_URL + '/list1');
  }

  getDepartmentByName(name:string) :Observable<Department> {
    return this.http.get<Department>(`${API_URL}/get/${name}`);
  }

  saveDepartment(department): Observable<Department> {
    return this.http.post<Department>(API_URL + '/create', department );
  }

  deleteDepartment(id:number):Observable<Department> {
    return this.http.delete<Department>(`${API_URL}/remove/${id}`);
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(`${API_URL}/update/${department.departmentId}`, department);
  }

  findById(id:number):Observable<Department> {
    return this.http.get<Department>(`${API_URL}/edit/${id}`);
  }

}

