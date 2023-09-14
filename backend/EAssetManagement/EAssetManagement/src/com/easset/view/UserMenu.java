package com.easset.view;

import java.util.List;
import java.util.Scanner;
import java.util.UUID;

import com.easset.entity.User;
import com.easset.exceptions.UserAlreadyExistsException;
import com.easset.exceptions.UserInputValidationException;
import com.easset.exceptions.UserNotFoundException;
import com.easset.service.UserService;
import com.easset.service.UserServiceImpl;

public class UserMenu {
	public static Scanner sc = new Scanner(System.in);
	public static UserService userServiceObject = new UserServiceImpl();
	public static User takeUserInput() {
		sc.nextLine();
        System.out.print("Enter Name: ");
        String name = sc.nextLine();
        System.out.print("Enter Role: ");
        String role = sc.nextLine();
        System.out.print("Enter Telephone: ");
        String telephone = sc.nextLine();
        System.out.print("Enter Email: ");
        String email = sc.nextLine();
        System.out.print("Enter Username: ");
        String username = sc.nextLine();
        System.out.print("Enter Password: ");
        String password = sc.nextLine();
        int uniqueId = UUID.randomUUID().hashCode();
        User user = new User(uniqueId, name, role, telephone, email, username, password);
        return user;
    }
	public static void displayUsers(List<User> allUsers) {
		System.out.println("Displaying users: ");
    	for(User u : allUsers) {
    		System.out.println(u.toString());
    	}
	}
	public static void displayUserMenu() {
        while (true) {
            System.out.println("User Menu:");
            System.out.println("1. Add a user");
            System.out.println("2. Get all users");
            System.out.println("3. Find a user by ID");
            System.out.println("4. Check if user is banned");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");

            int choice = sc.nextInt();
            switchUserMenu(choice);
        }
    }
	public static void switchUserMenu(int choice) {
    	switch (choice) {
	        case 1:
	            User userInput = takeUserInput();
	            System.out.println(userInput.toString());
	            try {
	                userServiceObject.addUser(userInput);
	                System.out.println("User added successfully.");
	            } catch (UserAlreadyExistsException e) {
	                e.printStackTrace();
	            } catch (UserInputValidationException e) {
					e.printStackTrace();
				}
	            break;
	
	        case 2:
	            List<User> allCategories = userServiceObject.getAllUsers();
	            displayUsers(allCategories);
	            break;
	
	        case 3:
	            System.out.print("Enter the user ID: ");
	            int userId = sc.nextInt();
	            try {
	                User c = userServiceObject.getUser(userId);
	                System.out.println(c.toString());
	            } catch (UserNotFoundException e) {
	                System.out.println("User not found.");
	            }
	            break;
	            
	        case 4:
	        	System.out.println("Enter user id to check:");
	        	int userId2=sc.nextInt();
	        	int bannedTillDays=userServiceObject.bannedTill(userId2);
	        	System.out.println("User is banned for the next "+bannedTillDays+" days");
	        	break;
	
	        case 5:
	            System.out.println("Exiting the User Menu.");
	            break;
	
	        default:
	            System.out.println("Invalid choice. Please try again.");
	            break;
	    }
    }
}
