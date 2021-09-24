/* 
 * Project: Employee.java
 * Version: 1.0
 * Date: Sep 20, 2021
 * Copyright 2021
 * Modification: 
 * Date				Author				Description
 * --------------------------------------------------
 * Sep 20, 2021		KyNC6				Create
 */

package com.fpt.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

// TODO: Auto-generated Javadoc
/**
 * The Class Employee.
 */
@Entity
@Table
public class Employee {

	/** The employee id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "employee_id")
	private int employeeId;
	
	/** The employee name. */
	@Column(name = "employee_name", columnDefinition = "varchar(50)")
	@NotBlank(message = "Họ tên không được để trống")
	@Size(min = 3, max = 50, message = "Nhập tối thiểu 3 ký tự")
	@Pattern(regexp = "^[a-zA-Z0-9 ._]{1,}$")
	private String employeeName;
	
	/** The employee gender. */
	@Column(name = "employee_gender")
	@NotBlank(message = "Giới tính không được để trống")
	private String employeeGender;
	
	/** The day of birth. */
	@Column(name = "day_of_birth" , columnDefinition = "dateTime")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	private Date dayOfBirth;
	
	/** The employee phone. */
	@Column(name = "employee_phone", columnDefinition = "varchar(10)")
	@NotBlank(message = "Số điện thoại không được để trống")
	@Pattern(regexp = "^[0]\\d{9}$" , message = "Số điện thoại gồm 10 chữ số - bắt đầu bởi số 0")
	private String employeePhone;
	
	/** The employee address. */
	@Column(name = "employee_address" , columnDefinition = "Nvarchar(255)")
	@NotBlank(message = "Địa chỉ không được để trống")

	private String employeeAddress;
	
	/** The employee position. */
	@Column(name = "employee_position" , columnDefinition = "Nvarchar(50)")
	@NotBlank(message = "Chức vụ không được để trống")

	private String employeePosition;
	
	/** The employee salary. */
	@Column(name = "employee_salary", columnDefinition = "varchar(10)")
	@Size(max = 10 , message = "Tối đa 10 chữ số")
	@Pattern(regexp = "^[0-9]+$", message = "Salary gồm chữ số")
	@NotBlank(message = "Lương không được để trống")
	private String employeeSalary;
	
	/** The employee img. */
	@Column(name = "employee_img")
	private String employeeImg;
	
	/** The department. */
	@ManyToOne
	@JoinColumn(name = "department_id", referencedColumnName = "department_id")
	private Department department;

//	public Employee() {
//
//	}
//
//	
//
//	public Employee(String employeeName, String employeeGender, Date dayOfBirth, String employeePhone,
//			String employeeAddress, String employeePosition, String employeeSalary, String employeeImg,
//			Department department) {
//		super();
//		this.employeeName = employeeName;
//		this.employeeGender = employeeGender;
//		this.dayOfBirth = dayOfBirth;
//		this.employeePhone = employeePhone;
//		this.employeeAddress = employeeAddress;
//		this.employeePosition = employeePosition;
//		this.employeeSalary = employeeSalary;
//		this.employeeImg = employeeImg;
//		this.department = department;
//	}



	/**
 * Gets the employee id.
 *
 * @return the employee id
 */
public int getEmployeeId() {
		return employeeId;
	}

	/**
	 * Sets the employee id.
	 *
	 * @param employeeId the new employee id
	 */
	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	/**
	 * Gets the employee name.
	 *
	 * @return the employee name
	 */
	public String getEmployeeName() {
		return employeeName;
	}

	/**
	 * Sets the employee name.
	 *
	 * @param employeeName the new employee name
	 */
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	/**
	 * Gets the employee gender.
	 *
	 * @return the employee gender
	 */
	public String getEmployeeGender() {
		return employeeGender;
	}

	/**
	 * Sets the employee gender.
	 *
	 * @param employeeGender the new employee gender
	 */
	public void setEmployeeGender(String employeeGender) {
		this.employeeGender = employeeGender;
	}

	/**
	 * Gets the day of birth.
	 *
	 * @return the day of birth
	 */
	public Date getDayOfBirth() {
		return dayOfBirth;
	}

	/**
	 * Sets the day of birth.
	 *
	 * @param dayOfBirth the new day of birth
	 */
	public void setDayOfBirth(Date dayOfBirth) {
		this.dayOfBirth = dayOfBirth;
	}

	/**
	 * Gets the employee phone.
	 *
	 * @return the employee phone
	 */
	public String getEmployeePhone() {
		return employeePhone;
	}

	/**
	 * Sets the employee phone.
	 *
	 * @param employeePhone the new employee phone
	 */
	public void setEmployeePhone(String employeePhone) {
		this.employeePhone = employeePhone;
	}

	/**
	 * Gets the employee address.
	 *
	 * @return the employee address
	 */
	public String getEmployeeAddress() {
		return employeeAddress;
	}

	/**
	 * Sets the employee address.
	 *
	 * @param employeeAddress the new employee address
	 */
	public void setEmployeeAddress(String employeeAddress) {
		this.employeeAddress = employeeAddress;
	}

	/**
	 * Gets the employee position.
	 *
	 * @return the employee position
	 */
	public String getEmployeePosition() {
		return employeePosition;
	}

	/**
	 * Sets the employee position.
	 *
	 * @param employeePosition the new employee position
	 */
	public void setEmployeePosition(String employeePosition) {
		this.employeePosition = employeePosition;
	}

	/**
	 * Gets the employee salary.
	 *
	 * @return the employee salary
	 */
	public String getEmployeeSalary() {
		return employeeSalary;
	}

	/**
	 * Sets the employee salary.
	 *
	 * @param employeeSalary the new employee salary
	 */
	public void setEmployeeSalary(String employeeSalary) {
		this.employeeSalary = employeeSalary;
	}

	/**
	 * Gets the department.
	 *
	 * @return the department
	 */
	public Department getDepartment() {
		return department;
	}

	/**
	 * Sets the department.
	 *
	 * @param department the new department
	 */
	public void setDepartment(Department department) {
		this.department = department;
	}

	/**
	 * To string.
	 *
	 * @return the string
	 */
	@Override
	public String toString() {
		return "Employee [employeeId=" + employeeId + ", employeeName=" + employeeName + ", employeeGender="
				+ employeeGender + ", dayOfBirth=" + dayOfBirth + ", employeePhone=" + employeePhone
				+ ", employeeAddress=" + employeeAddress + ", employeePosition=" + employeePosition
				+ ", employeeSalary=" + employeeSalary + ", employeeImg=" + employeeImg +  "]";
	}

	

	
	
	
}
