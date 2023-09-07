package com.easset.view;

import java.time.LocalDate;
import java.util.List;
import java.util.Scanner;
import java.util.UUID;

import com.easset.service.AssetServiceImpl;
import com.easset.service.CategoryService;
import com.easset.service.CategoryServiceImpl;
import com.easset.entity.Asset;
import com.easset.entity.Category;
import com.easset.exceptions.AssetAlreadyExistsException;
import com.easset.exceptions.AssetNotFoundException;
import com.easset.exceptions.CategoryNotFoundException;
import com.easset.service.AssetService;

public class AssetMenu {
	public static Scanner sc = new Scanner(System.in);
	public static AssetService assetServiceObject = new AssetServiceImpl();
	public static CategoryMenu categoryMenuObject = new CategoryMenu();
	
	public static Asset takeAssetInput() {
        System.out.print("Enter the asset name: ");
        String name = sc.nextLine();
        
        boolean categoryIdSelected = false;
        int categoryIdFetched = 1;
        while(categoryIdSelected == false) {
        	// print the existing categories
            System.out.println("Existing categories the current asset could belong to: ");
            categoryMenuObject.switchCategoryMenu(2);
            
            System.out.print("Enter the category ID: ");
            int categoryId = sc.nextInt();
            sc.nextLine(); // Consume the newline character left by nextInt()
            
            // if category doesn't exist then create a new category
            CategoryService categoryServiceObject = new CategoryServiceImpl();
            try {
    			Category c = categoryServiceObject.getCategory(categoryId);
    			categoryIdFetched = c.getId();
    			categoryIdSelected = true;
    		} catch (CategoryNotFoundException e) {
    			System.out.println("The category id you selected currently doesn't exist.");
    			// the category does't exist therefore create it.
    			categoryMenuObject.switchCategoryMenu(1);
    		} finally {
    			System.out.println("The category ID you have choosen exists.");
    		}
        }
        
        System.out.print("Enter the asset description: ");
        String description = sc.nextLine();
        boolean isAvailable = true;
        // Assuming you want to capture the current date for dateAdded
        LocalDate dateAdded = LocalDate.now();
        // Generate a unique ID (you can adjust this based on your actual logic)
        int uniqueId = UUID.randomUUID().hashCode();
        Asset asset = new Asset(uniqueId, name, categoryIdFetched, description, isAvailable, dateAdded);
        return asset;
    }
	
	public static void displayAssets(List<Asset> allAssets) {
		System.out.println("Displaying assets: ");
		for (Asset a : allAssets) {
			System.out.println(a.toString());
		}
	}
	public static void displayAssetMenu() {
	    while (true) {
	        System.out.println("Asset Menu:");
	        System.out.println("1. Add an asset");
	        System.out.println("2. Get all assets");
	        System.out.println("3. Find an asset by ID");
	        System.out.println("4. List available assets");
	        System.out.println("5. Exit");
	        System.out.print("Enter your choice: ");

	        int choice = sc.nextInt();
	        sc.nextLine();
	        switchAssetMenu(choice);
	    }
	}

	public static void switchAssetMenu(int choice) {
	    switch (choice) {
	        case 1:
	            Asset assetInput = takeAssetInput();
	            System.out.println(assetInput.toString());
	            try {
	                assetServiceObject.addAsset(assetInput);
	                System.out.println("Asset added successfully.");
	            } catch (AssetAlreadyExistsException e) {
	                e.printStackTrace();
	            }
	            break;

	        case 2:
	            List<Asset> allAssets = assetServiceObject.getAllAssets();
	            displayAssets(allAssets);
	            break;

	        case 3:
	            System.out.print("Enter the asset ID: ");
	            int assetId = sc.nextInt();
	            try {
	                Asset a = assetServiceObject.getAsset(assetId);
	                System.out.println(a.toString());
	            } catch (AssetNotFoundException e) {
	                System.out.println("Asset not found.");
	            }
	            break;

	        case 4:
	        	List<Asset> allAssets2 = assetServiceObject.getAllAssets();
	             List<Asset> filteredAssets = assetServiceObject.filterAssets(allAssets2, asset -> asset.getIsAvailable());
	             displayAssets(filteredAssets);
	            break;

	        case 5:
	            System.out.println("Exiting the Asset Menu.");
	            return;

	        default:
	            System.out.println("Invalid choice. Please try again.");
	            break;
	    }
	}
}
