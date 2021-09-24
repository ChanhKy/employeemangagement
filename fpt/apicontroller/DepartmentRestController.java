/* 
 * Project: DepartmentRestController.java
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
import com.fpt.service.DepartmentService;

// TODO: Auto-generated Javadoc
/**
 * The Class DepartmentRestController.
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/department")
public class DepartmentRestController {

	/** The department service. */
	@Autowired
	private DepartmentService departmentService;

	/**
	 * Show list.
	 *
	 * @return the response entity
	 */
	@GetMapping(value = "/list1")
	public ResponseEntity<List<Department>> showList() {
		List<Department> departments = departmentService.getAll();
		if (departments.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(departments, HttpStatus.OK);
	}

	/**
	 * Gets the departments.
	 *
	 * @param search     the search
	 * @param pageNumber the page number
	 * @param pageSize   the page size
	 * @return the departments
	 */
	@GetMapping("/list")
	public Object getDepartments(@RequestParam(name = "search", defaultValue = "", required = false) String search,
			@RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
			@RequestParam(name = "pageSize", defaultValue = "5") int pageSize) {
		pageNumber = pageNumber != 0 ? pageNumber - 1 : pageNumber;
		Page<Department> departments;
		if (search.isEmpty()) {
			departments = departmentService.getAllPaging(pageNumber, pageSize);
		} else {
			Pageable pageble = PageRequest.of(pageNumber, pageSize);
			departments = departmentService.searchByString(search, pageble);
		}
		if (departments.isEmpty()) {
			return new ResponseEntity<>(Page.empty(), HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(departments, HttpStatus.OK);
		}
	}

	/**
	 * Save department.
	 *
	 * @param department the department
	 * @return the response entity
	 */
	@PostMapping(value = "/create")
	public ResponseEntity<Department> saveDepartment(@RequestBody @Valid Department department,
			BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Department>(HttpStatus.FAILED_DEPENDENCY);
		}
		return new ResponseEntity<Department>(departmentService.saveDepartment(department), HttpStatus.CREATED);
	}

	@GetMapping(value = "/get/{name}")
	public ResponseEntity<Department> getDepartmentByName(@PathVariable String name) {
		Department emp = departmentService.getDepartmentByName(name);
		return new ResponseEntity <Department>(emp, HttpStatus.OK);
	}
	/**
	 * Find depart by id.
	 *
	 * @param id the id
	 * @return the response entity
	 */
	@GetMapping(value = "/edit/{id}")
	public ResponseEntity<Department> findDepartById(@PathVariable int id) {
		Optional<Department> department = departmentService.getDeartmentById(id);
		if (department.isPresent()) {
			return new ResponseEntity<Department>(department.get(), HttpStatus.OK);
		}
		return new ResponseEntity<Department>(HttpStatus.NOT_FOUND);
	}

	/**
	 * Update department.
	 *
	 * @param id         the id
	 * @param department the department
	 * @return the response entity
	 */
	@PutMapping(value = "/update/{id}")
	public ResponseEntity<Department> updateDepartment(@PathVariable int id, @RequestBody @Valid Department department,
			BindingResult bindingResult) {
		Optional<Department> depart = departmentService.getDeartmentById(id);
		if (depart == null) {
			return new ResponseEntity<Department>(HttpStatus.NOT_FOUND);
		}
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Department>(HttpStatus.FAILED_DEPENDENCY);
		}
		return new ResponseEntity<Department>(departmentService.saveDepartment(department), HttpStatus.OK);
	}

	/**
	 * Delete department.
	 *
	 * @param id the id
	 * @return the response entity
	 */
	@SuppressWarnings("rawtypes")
	@DeleteMapping(value = "/remove/{id}")
	public ResponseEntity deleteDepartment(@PathVariable int id) {
		System.out.println(id);
		int count = departmentService.removeDepartment(id);
		return new ResponseEntity<Integer>(count, HttpStatus.OK);
	}

}
