package com.easset.view;

import java.util.Scanner;
import java.util.List;

import com.easset.entity.BorrowedAssets;
import com.easset.exceptions.AssetNotFoundException;
import com.easset.exceptions.UserBannedException;
import com.easset.service.BorrowedAssetsService;
import com.easset.service.BorrowedAssetsServiceImpl;

public class BorrowedAssetMenu {
	public static Scanner sc = new Scanner(System.in);
	public static BorrowedAssetsService borrowedAssetServiceObject = new BorrowedAssetsServiceImpl();
	public static void displayBorrowedAssetMenu() {
		while(true) {
			System.out.println("Borrowed Assets Menu:");
			System.out.println("1. Add a borrowed asset");//user
			System.out.println("2. Remove a borrowed asset");//user
			System.out.println("3. Get all borrowed assets");//admin
			System.out.println("4. Filter list of borrowed assets");//user
			System.out.println("5. Calculate late/penalty fee");//admin
			System.out.println("6. Check if asset is overdue");//admin
			System.out.println("Enter choice:");
			int choice=sc.nextInt();
			switchBorrowedAssetMenu(choice);
		}
	}
	public static void switchBorrowedAssetMenu(int choice) {
		switch(choice) {
		case 1:
			boolean checkAdded=borrowAsset();
			if(checkAdded==true)
				System.out.println("Asset borrowed successfully");
			else 
				System.out.println("Unable to borrow asset");
			break;
		case 2:
			boolean checkRemove=borrowAsset();
			if(checkRemove==true)
				System.out.println("Asset removed successfully");
			else 
				System.out.println("Unable to remove asset");
			break;
		case 3:
			List<BorrowedAssets> allBorrowedAssets=borrowedAssetServiceObject.getAllBorrowedAssets();
			for (BorrowedAssets borrowedAssets : allBorrowedAssets) {
				System.out.println(borrowedAssets.toString());
			}
			break;
		
		case 4:
			System.out.println("Enter user id to check for:");
			int userId1=sc.nextInt();
			List<BorrowedAssets> allBorrowedAssets2=borrowedAssetServiceObject.getAllBorrowedAssets();
		    List<BorrowedAssets> filteredBorrowedAssets=borrowedAssetServiceObject.filterBorrowedAssets(allBorrowedAssets2, borrowedAsset->borrowedAsset.getUserId()==userId1);
		    for (BorrowedAssets borrowedAssets : filteredBorrowedAssets) {
				System.out.println(borrowedAssets.toString());
			}
		  break;
		 
		case 5:
			System.out.println("Enter asset id:");
			int assetId=sc.nextInt();
			float lateFees=borrowedAssetServiceObject.calculateLateFees(assetId);
			System.out.println("Penalty to be paid: "+lateFees);
		case 6:
			System.out.println("Enter user id:");
			int userId=sc.nextInt();
			System.out.println("Enter asset id:");
			int assetId2=sc.nextInt();
			boolean overdue=borrowedAssetServiceObject.isOverdue(userId, assetId2);
			if(overdue==true)
				System.out.println("Asset is overdue for user");
			else
				System.out.println("Asset is not overdue for user");
			break;
		default:
			System.out.println("Invalid choice. PLease try again.");
			break;
		}
	}
	public static boolean borrowAsset() {
		System.out.println("Enter user id:");
		int userId=sc.nextInt();
		System.out.println("Enter asset id to borrow:");
		int assetId=sc.nextInt();
		try {
			return borrowedAssetServiceObject.addBorrowedAsset(userId, assetId);
		} catch (AssetNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		} catch (UserBannedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	public static boolean removeBorrowedAsset() {
		System.out.println("Enter user id:");
		int userId=sc.nextInt();
		System.out.println("Enter asset id to borrow:");
		int assetId=sc.nextInt();
		try {
			return borrowedAssetServiceObject.removeBorrowedAsset(userId, assetId);
		} catch (AssetNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		} 
	}
	
	
}
