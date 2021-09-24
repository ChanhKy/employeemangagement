/* 
 * Project: DepartmentServiceImpl.java
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

import com.fpt.entities.Department;
import com.fpt.repository.DepartmentRepository;
import com.fpt.service.DepartmentService;

// TODO: Auto-generated Javadoc
/**
 * The Class DepartmentServiceImpl.
 */
@Service
@Transactional
public class DepartmentServiceImpl implements DepartmentService{
	
	/** The department repository. */
	@Autowired
	private DepartmentRepository departmentRepository;

	/**
	 * Save department.
	 *
	 * @param department the department
	 * @return the department
	 */
	@Override
	public Department saveDepartment(Department department) {
		return departmentRepository.save(department);
		}

	/**
	 * Gets the deartment by id.
	 *
	 * @param id the id
	 * @return the deartment by id
	 */
	@Override
	public Optional<Department> getDeartmentById(int id) {
	
		return departmentRepository.findById(id);
	}
	
	
	/**
	 * Update department.
	 *
	 * @param departmnet the departmnet
	 * @return true, if successful
	 */
	@Override
	public boolean updateDepartment(Department departmnet) {
	
		return false;
	}

	/**
	 * Removes the department.
	 *
	 * @param id the id
	 */
	@Override
	public int removeDepartment(int id) {
		return 	departmentRepository.deleteByIDWithNumber(id);
		
	}
	public Department getDepartmentByName(String name) {
		return departmentRepository.getDepartmentByName(name);
	}

	/**
	 * Gets the all.
	 *
	 * @return the all
	 */
	@Override
	public List<Department> getAll() {
		// TODO Auto-generated method stub
		return departmentRepository.findAll();
	}

	/**
	 * Gets the all paging.
	 *
	 * @param page the page
	 * @param pageSize the page size
	 * @return the all paging
	 */
	@Override
	public Page<Department> getAllPaging(int page, int pageSize) {
		Page<Department> list = departmentRepository.findAll(PageRequest.of(page, pageSize, Sort.by("departmentId").descending()));
		return list;
	}

	/**
	 * Search by string.
	 *
	 * @param str the str
	 * @param page the page
	 * @return the page
	 */
	@Override
	public Page<Department> searchByString(String str, Pageable page) {
		// TODO Auto-generated method stub
		return departmentRepository.searchByString('%' + str + '%', page) ;
	}

	
	

}
