/* 
 * Project: EmployeeServiceImpl.java
 * Version: 1.0
 * Date: Sep 20, 2021
 * Copyright 2021
 * Modification: 
 * Date				Author				Description
 * --------------------------------------------------
 * Sep 20, 2021		KyNC6				Create
 */

package com.fpt.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fpt.entities.Employee;
import com.fpt.repository.EmployeeRepository;
import com.fpt.service.EmployeeService;

// TODO: Auto-generated Javadoc
/**
 * The Class EmployeeServiceImpl.
 */
@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

	/** The employee repository. */
	@Autowired
	private EmployeeRepository employeeRepository;

	/**
	 * Save emloyee.
	 *
	 * @param employee the employee
	 * @return the employee
	 */
	@Override
	public Employee saveEmloyee(Employee employee) {
		return employeeRepository.save(employee);
	}

	/**
	 * Find all.
	 *
	 * @return the list
	 */
	@Override
	public List<Employee> findAll() {

		return employeeRepository.findAll();
	}

	/**
	 * Find by derpartment.
	 *
	 * @return the list
	 */
	@Override
	public List<Employee> findByDerpartment() {

		return null;
	}

	/**
	 * Gets the employee by id.
	 *
	 * @param id the id
	 * @return the employee by id
	 */
	@Override
	public Optional<Employee> getEmployeeById(int id) {
		// TODO Auto-generated method stub
		return employeeRepository.findById(id);
	}

	/**
	 * Update employee.
	 *
	 * @param employee the employee
	 * @return true, if successful
	 */
	@Override
	public boolean updateEmployee(Employee employee) {
		// TODO Auto-generated method stub
		return false;
	}

	/**
	 * Removes the employee.
	 *
	 * @param id the id
	 */
	@Override
	public int removeEmployee(int id) {
		return employeeRepository.deleteByIDWithNumber(id);
		
	}

	/**
	 * Search by string.
	 *
	 * @param str the str
	 * @param page the page
	 * @return the page
	 */
	@Override
	public Page<Employee> searchByString(String str, Pageable page) {
		Page<Employee> emp = employeeRepository.searchByString('%' +str + '%', page);
		return emp;
	}

	/**
	 * Gets the all paging.
	 *
	 * @param page the page
	 * @param pageSize the page size
	 * @return the all paging
	 */
	@Override
	public Page<Employee> getAllPaging(int page, int pageSize) {
		Page<Employee> list = employeeRepository.findAll(PageRequest.of(page, pageSize, Sort.by("employeeId").descending()));
		return list;
	}

	@Override
	public List<Employee> findAllEmployeeByDepartmentId(int id) {
		// TODO Auto-generated method stub
		return employeeRepository.findAllEmployeeByDepartmentId(id);
	}

	@Override
	public Employee getEmployeeByName(String name) {
		
		return employeeRepository.getEmployeeByName(name);
	}

	
	
}
