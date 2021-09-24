/* 
 * Project: Department.java
 * Version: 1.0
 * Date: Sep 20, 2021
 * Copyright 2021
 * Modification: 
 * Date				Author				Description
 * --------------------------------------------------
 * Sep 20, 2021		KyNC6				Create
 */


package com.fpt.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonBackReference;

// TODO: Auto-generated Javadoc
/**
 * The Class Department.
 */
@Entity

public class Department {

	/** The department id. */
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	@Column(name = "department_id")
	private int departmentId;
	
	/** The department name. */
	@Column (name = "department_name" , columnDefinition = "Nvarchar(50)")
	@NotBlank(message = "Tên phòng ban không được để trống")
	@Pattern(regexp = "^[a-zA-Z0-9 ._/+#]{1,}$")
	private String departmentName;
	
	/** The description. */
	@Column(name = "description", columnDefinition = "Nvarchar(255)")
	@NotBlank(message = "Trường này không được để trống")
	private String description;
	
	/** The employees. */
	@OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
	@JsonBackReference
	private List<Employee> employees;

	/**
	 * Instantiates a new department.
	 */
	public Department() {
	
	}

	/**
	 * Instantiates a new department.
	 *
	 * @param departmentName the department name
	 * @param description the description
	 * @param employees the employees
	 */
	public Department(String departmentName, String description, List<Employee> employees) {
		super();
		this.departmentName = departmentName;
		this.description = description;
		this.employees = employees;
	}

	/**
	 * Gets the department id.
	 *
	 * @return the department id
	 */
	public int getDepartmentId() {
		return departmentId;
	}

	/**
	 * Sets the department id.
	 *
	 * @param departmentId the new department id
	 */
	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	/**
	 * Gets the department name.
	 *
	 * @return the department name
	 */
	public String getDepartmentName() {
		return departmentName;
	}

	/**
	 * Sets the department name.
	 *
	 * @param departmentName the new department name
	 */
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	/**
	 * Gets the description.
	 *
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * Sets the description.
	 *
	 * @param description the new description
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * Gets the employees.
	 *
	 * @return the employees
	 */
	public List<Employee> getEmployees() {
		return employees;
	}

	/**
	 * Sets the employees.
	 *
	 * @param employees the new employees
	 */
	public void setEmployees(List<Employee> employees) {
		this.employees = employees;
	}

	/**
	 * To string.
	 *
	 * @return the string
	 */
	@Override
	public String toString() {
		return "Department [departmentId=" + departmentId + ", departmentName=" + departmentName + ", description="
				+ description + "]";
	}
	
	
}
