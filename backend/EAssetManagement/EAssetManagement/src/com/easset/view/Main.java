package com.easset.view;

import java.util.Scanner;

import com.easset.exceptions.UserNotFoundException;
import com.easset.service.UserServiceImpl;

public class Main {
    public static void main(String[] args) throws UserNotFoundException {
    	UserServiceImpl userServiceObject = new UserServiceImpl();
    	Scanner sc=new Scanner(System.in);
    	System.out.println("Enter user id");
    	int userId=sc.nextInt();
    	System.out.println("User id accepted");
		String userRole = userServiceObject.getUser(userId).getRole();
    	if(userRole.equals("Admin")) {
    		System.out.println("User is an admin");
    		CategoryMenu.displayCategoryMenu();
    		UserMenu.displayUserMenu();
    		AssetMenu.displayAssetMenu();
			BorrowedAssetMenu.displayBorrowedAssetMenu();
    	} else if(userRole.equals("Borrower")) {
    		System.out.println("User is an borrower");
    		BorrowedAssetMenu.displayBorrowedAssetMenu();
    	} 
    	sc.close();
	}
}
