import { Department } from "./department";

export interface Employee {
  employeeId?: number;
  employeeName?: string;
  employeeGender?: string;
  dayOfBirth?: Date;
  employeePhone?: string;
  employeeAddress?: string;
  employeePosition?: string;
  employeeSalary?: string;
  employeeImg?: string;
  department?: Department;
}
