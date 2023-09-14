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
    	if(userServiceObject.getUser(userId).getRole()=="Admin") {
    		System.out.println("User is an admin");
    		CategoryMenu.displayCategoryMenu();
    		UserMenu.displayUserMenu();
    		AssetMenu.displayAssetMenu();
    		BorrowedAssetMenu.displayBorrowedAssetMenu();
    	}
    	else if(userServiceObject.getUser(userId).getRole()=="Borrower") {
    		System.out.println("User is an borrower");
    		CategoryMenu.displayCategoryMenu();
    		UserMenu.displayUserMenu();
    		AssetMenu.displayAssetMenu();
    		BorrowedAssetMenu.displayBorrowedAssetMenu();
    	} 
    	sc.close();
	}
}
