package com.easset.view;

import java.util.List;
import java.util.Scanner;
import java.util.UUID;

import com.easset.entity.Category;
import com.easset.exceptions.CategoryAlreadyExistsException;
import com.easset.exceptions.CategoryNotFoundException;
import com.easset.service.CategoryService;
import com.easset.service.CategoryServiceImpl;

public class CategoryMenu {
	public static Scanner sc = new Scanner(System.in);
	public static CategoryService categoryServiceObject = new CategoryServiceImpl();
	
	public static Category takeCategoryInput() {
        System.out.print("Enter the category name: ");
        String name = sc.nextLine();
        System.out.print("Enter the lending period: ");
        int lendingPeriod = sc.nextInt();
        System.out.print("Enter the late fees per day: ");
        float lateFeesPerDay = sc.nextFloat();
        System.out.print("Enter the banning period: ");
        int banningPeriod = sc.nextInt();
        // ids are auto_increment on the database
        int uniqueId = UUID.randomUUID().hashCode();
        Category category = new Category(uniqueId, name, lendingPeriod, lateFeesPerDay, banningPeriod);
        return category;
    }
    
    public static void displayCategories(List<Category> allCategories) {
    	System.out.println("Displaying categories: ");
    	for(Category c : allCategories) {
    		System.out.println(c.toString());
    	}
    }
    
    public static void displayCategoryMenu() {
        while (true) {
            System.out.println("Category Menu:");
            System.out.println("1. Add a category");
            System.out.println("2. Get all categories");
            System.out.println("3. Find a category by ID");
            System.out.println("4. Exit");
            System.out.print("Enter your choice: ");

            int choice = sc.nextInt();
            switchCategoryMenu(choice);
        }
    }
    
    // here the switch case is kept separately so that we can call a specific functionality by passing in the 
    // choice
    public static void switchCategoryMenu(int choice) {
    	switch (choice) {
	        case 1:
	            Category categoryInput = takeCategoryInput();
	            System.out.println(categoryInput.toString());
	            try {
	                categoryServiceObject.addCategory(categoryInput);
	                System.out.println("Category added successfully.");
	            } catch (CategoryAlreadyExistsException e) {
	                e.printStackTrace();
	            }
	            break;
	
	        case 2:
	            List<Category> allCategories = categoryServiceObject.getAllCategories();
	            displayCategories(allCategories);
	            break;
	
	        case 3:
	            System.out.print("Enter the category ID: ");
	            int categoryId = sc.nextInt();
	            try {
	                Category c = categoryServiceObject.getCategory(categoryId);
	                System.out.println(c.toString());
	            } catch (CategoryNotFoundException e) {
	                System.out.println("Category not found.");
	            }
	            break;
	
	        case 4:
	            System.out.println("Exiting the Category Menu.");
	            return;
	
	        default:
	            System.out.println("Invalid choice. Please try again.");
	            break;
	    }
    }
}
