package com.easset.storage;

import java.util.List;

import com.easset.entity.Category;
import com.easset.exceptions.CategoryAlreadyExistsException;
import com.easset.exceptions.CategoryNotFoundException;

public interface CategoryStorage {
	public boolean addCategory(Category c);
	public Category getCategory(int categoryId);
	public List<Category> getAllCategories();
}
