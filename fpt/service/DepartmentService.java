/* 
 * Project: DepartmentService.java
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

import com.fpt.entities.Department;

public interface DepartmentService {

	Department saveDepartment(Department department);
	List<Department> getAll();
	Optional<Department> getDeartmentById(int id);

	boolean updateDepartment(Department departmnet);
	int removeDepartment(int id);
	Page<Department> searchByString(String str, Pageable page);
	
	Page<Department> getAllPaging(int page, int pageSize);
	Department getDepartmentByName(String name);
}
