/* 
 * Project: EmployeeService.java
 * Version: 1.0
 * Date: Sep 20, 2021
 * Copyright 2021
 * Modification: 
 * Date				Author				Description
 * --------------------------------------------------
 * Sep 20, 2021		KyNC6				Create
 */

package com.fpt.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fpt.entities.Employee;

public interface EmployeeService {

	Employee saveEmloyee(Employee employee);
	List<Employee> findAll();
	List<Employee> findByDerpartment();
	Optional<Employee> getEmployeeById(int id);
	Employee getEmployeeByName(String name);
	boolean updateEmployee(Employee employee);
	int removeEmployee(int id);
	List<Employee> findAllEmployeeByDepartmentId(int id);

	Page<Employee> searchByString(String str, Pageable page);
	
	Page<Employee> getAllPaging(int page, int pageSize);
}
