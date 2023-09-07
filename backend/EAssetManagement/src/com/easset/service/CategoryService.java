package com.easset.service;

import java.util.List;

import com.easset.entity.Category;
import com.easset.exceptions.CategoryAlreadyExistsException;
import com.easset.exceptions.CategoryNotFoundException;

public interface CategoryService {
	public boolean addCategory(Category c) throws CategoryAlreadyExistsException;
	public Category getCategory(int categoryId) throws CategoryNotFoundException;
	public List<Category> getAllCategories();
}
