/* 
 * Project: EmployeeRepository.java
 * Version: 1.0
 * Date: Sep 20, 2021
 * Copyright 2021
 * Modification: 
 * Date				Author				Description
 * --------------------------------------------------
 * Sep 20, 2021		KyNC6				Create
 */

package com.fpt.repository;




import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fpt.entities.Employee;
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

	@Query(value = " FROM Employee e "
			+ "WHERE e.employeeName LIKE ?1 "
			+ "OR e.employeePhone LIKE ?1 "
			+ "OR e.employeeAddress LIKE ?1 "
			+ "OR e.employeePosition LIKE ?1 "
			+ "OR e.department.departmentName LIKE ?1 "
			)
	Page<Employee> searchByString(String str, Pageable page);
	
	@Query(value = "FROM Employee e WHERE e.department.departmentId = ?1")
	List<Employee> findAllEmployeeByDepartmentId(int id);

	@Modifying(clearAutomatically = true, flushAutomatically = true)
	@Query(value = "DELETE FROM Employee WHERE employeeId =?1")
	int deleteByIDWithNumber(int id);
	
	@Query(value = "FROM Employee WHERE employeeName = ?1")
	Employee getEmployeeByName(String name);
}
