package com.easset.service;

import java.util.List;

import com.easset.entity.Category;
import com.easset.exceptions.CategoryAlreadyExistsException;
import com.easset.exceptions.CategoryNotFoundException;
import com.easset.storage.CategoryStorageImpl;
import com.easset.storage.CategoryStorage;

public class CategoryServiceImpl implements CategoryService {
	static CategoryStorage categoryStorageObject = new CategoryStorageImpl();
	@Override
	public boolean addCategory(Category c) throws CategoryAlreadyExistsException {
		boolean addedStatus = categoryStorageObject.addCategory(c);
		if (addedStatus == true) {
			return true;
		}
		throw new CategoryAlreadyExistsException("The category you are adding already exists.");
	}

	@Override
	public Category getCategory(int categoryId) throws CategoryNotFoundException {
		Category c = categoryStorageObject.getCategory(categoryId);
		if (c != null) {
			return c;
		}
		throw new CategoryNotFoundException("The category with id " + categoryId + "doesn't exist.");
	}

	@Override
	public List<Category> getAllCategories() {
		// TODO Auto-generated method stub
		return categoryStorageObject.getAllCategories();
	}
}
