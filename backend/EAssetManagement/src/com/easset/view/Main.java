package com.easset.view;

import java.util.List;
import java.util.Scanner;
import java.util.UUID;

import com.easset.entity.Category;
import com.easset.exceptions.CategoryAlreadyExistsException;
import com.easset.exceptions.CategoryNotFoundException;
import com.easset.service.CategoryService;
import com.easset.service.CategoryServiceImpl;

public class Main {
	public static CategoryMenu categoryMenuObject = new CategoryMenu();
	public static UserMenu userMenuObject = new UserMenu();
	public static AssetMenu assetMenuObject = new AssetMenu();
    public static void main(String[] args) {
//    	categoryMenuObject.displayCategoryMenu();
//    	userMenuObject.displayUserMenu();
//    	assetMenuObject.displayAssetMenu();
	}
}
