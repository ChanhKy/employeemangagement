/* 
 * Project: EmployeeRestController.java
 * Version: 1.0
 * Date: Sep 20, 2021
 * Copyright 2021
 * Modification: 
 * Date				Author				Description
 * --------------------------------------------------
 * Sep 20, 2021		KyNC6				Create
 */

package com.fpt.apicontroller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fpt.entities.Department;
import com.fpt.entities.Employee;
import com.fpt.service.DepartmentService;
import com.fpt.service.EmployeeService;

// TODO: Auto-generated Javadoc
/**
 * The Class EmployeeRestController.
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/employee")
public class EmployeeRestController {

	/** The employee service. */
	@Autowired
	private EmployeeService employeeService;

	/** The department servie. */
	@Autowired
	private DepartmentService departmentServie;

	/**
	 * Gets the employees.
	 *
	 * @param search     the search
	 * @param pageNumber the page number
	 * @param pageSize   the page size
	 * @return the employees
	 */
	@GetMapping("/list")
	public Object getEmployees(@RequestParam(name = "search", defaultValue = "", required = false) String search,
			@RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
			@RequestParam(name = "pageSize", defaultValue = "5") int pageSize) {
		pageNumber = pageNumber != 0 ? pageNumber - 1 : pageNumber;
		Page<Employee> employees;
		if (search.isEmpty()) {
			employees = employeeService.getAllPaging(pageNumber, pageSize);
		} else {
			Pageable pageable = PageRequest.of(pageNumber, pageSize);
			employees = employeeService.searchByString(search, pageable);
		}
		if (employees.isEmpty()) {
			return new ResponseEntity<>(Page.empty(), HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(employees, HttpStatus.OK);
		}
	}

	/**
	 * Show list department.
	 *
	 * @return the response entity
	 */
	@GetMapping(value = "/list-department")
	public ResponseEntity<List<Department>> showListDepartment() {
		List<Department> departments = departmentServie.getAll();
		if (departments.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(departments, HttpStatus.OK);
	}
	
	@GetMapping(value = "/list-department-id/{id}")
	public ResponseEntity<List<Employee>> finAllEmployeeByDepartmentId(@PathVariable int id) {
		List<Employee> employees = employeeService.findAllEmployeeByDepartmentId(id);
		if (employees.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(employees, HttpStatus.OK);
	
	}

	/**
	 * Save employee.
	 *
	 * @param employee the employee
	 * @return the response entity
	 */
	@PostMapping(value = "/create")
	public ResponseEntity<Employee> saveEmployee(@RequestBody @Valid Employee employee) {
//		if (bindingResult.hasErrors()) {
//			System.out.println("loi roi");
//			return new ResponseEntity<Employee>(HttpStatus.FOUND);
//			
//		}
		System.out.println("ko vao dc day");
		employeeService.saveEmloyee(employee);
		return new ResponseEntity<Employee>(HttpStatus.OK);
	}
	
	@GetMapping(value = "/get/{name}")
	public ResponseEntity<Employee> getEmployeeByName(@PathVariable String name) {
		Employee emp = employeeService.getEmployeeByName(name);
		return new ResponseEntity <Employee>(emp, HttpStatus.OK);
	}

	/**
	 * Gets the employee by id.
	 *
	 * @param id the id
	 * @return the employee by id
	 */
	@GetMapping(value = "/edit/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable int id) {
		Optional<Employee> employee = employeeService.getEmployeeById(id);
		if (employee.isPresent()) {
			return new ResponseEntity<Employee>(employee.get(), HttpStatus.OK);
		}
		return new ResponseEntity<Employee>(HttpStatus.NOT_FOUND);
	}

	/**
	 * Update employee.
	 *
	 * @param id       the id
	 * @param employee the employee
	 * @return the response entity
	 */
	@PutMapping(value = "/update/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable int id, @RequestBody @Valid Employee employee,
			BindingResult bindingResult) {
		Optional<Employee> emp = employeeService.getEmployeeById(id);
		System.out.println(emp);
		if (emp == null) {
			return new ResponseEntity<Employee>(HttpStatus.NOT_FOUND);
		}
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Employee>(HttpStatus.FAILED_DEPENDENCY);
		}
		return new ResponseEntity<Employee>(employeeService.saveEmloyee(employee), HttpStatus.OK);
	}

	/**
	 * Delete employee.
	 *
	 * @param id the id
	 * @return the response entity
	 */
	@DeleteMapping(value = "/remove/{id}")
	public ResponseEntity<Integer> deleteEmployee(@PathVariable int id) {
		System.out.println("id cua employee can xoa" + id);
		int count = employeeService.removeEmployee(id);
		return new ResponseEntity<Integer>(count, HttpStatus.OK);
	}
}
