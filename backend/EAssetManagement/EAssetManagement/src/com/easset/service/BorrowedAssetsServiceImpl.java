package com.easset.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.easset.entity.Asset;
import com.easset.entity.BorrowedAssets;
import com.easset.entity.Category;
import com.easset.exceptions.AssetNotFoundException;
import com.easset.exceptions.UserBannedException;
import com.easset.storage.AssetStorage;
import com.easset.storage.BorrowedAssetsStorage;
import com.easset.storage.BorrowedAssetsStorageImpl;
import com.easset.storage.CategoryStorage;
import com.easset.storage.CategoryStorageImpl;
import com.easset.utils.BorrowedAssetsFinder;

public class BorrowedAssetsServiceImpl implements BorrowedAssetsService {
	static BorrowedAssetsStorage borrowedAssetObject=new BorrowedAssetsStorageImpl();
	@Override
	public boolean addBorrowedAsset(int userId, int assetId) throws AssetNotFoundException, UserBannedException {
		// TODO Auto-generated method stub
		boolean addedStatus = borrowedAssetObject.addBorrowedAsset(userId, assetId);
		Asset assetObject=null;
		assetObject=((AssetStorage) assetObject).getAsset(assetId);
		if (addedStatus == true) {
			return true;
		}
		else if(assetObject==null) {
			throw new AssetNotFoundException("The asset you are looking for does not exist");
		}
		else {
			throw new UserBannedException("The user has been banned and cannot borrow an asset");
		}
		
	}

	@Override
	public boolean removeBorrowedAsset(int userId, int assetId)  throws AssetNotFoundException {
		boolean removedStatus = borrowedAssetObject.removeBorrowedAsset(userId, assetId);
		if(removedStatus==true)
			return true;
		else
			throw new AssetNotFoundException("The asset you are looking for does not exist");
	}

	@Override
	public List<BorrowedAssets> getAllBorrowedAssets() {
		return borrowedAssetObject.getAllBorrowedAssets();
	}

	@Override
	public List<BorrowedAssets> filterBorrowedAssets(List<BorrowedAssets> allAssets, BorrowedAssetsFinder baf) {
		List<BorrowedAssets> filteredAssets = new ArrayList<>();
		for (BorrowedAssets ba : allAssets) {
			if (baf.findBorrowedAssets(ba)) {
				filteredAssets.add(ba);
			}
		}
		return filteredAssets;
	}

	@Override
	public float calculateLateFees(int assetId) {
		// TODO Auto-generated method stub
		BorrowedAssets borrowedAsset=null;
		CategoryStorage cat=new CategoryStorageImpl();
		for (BorrowedAssets ba : borrowedAssetObject.getAllBorrowedAssets()) {
			if(ba.getAssetId()==assetId) {
				borrowedAsset=ba;
				break;
			}
		}
		Category c=cat.getCategory(assetId);
		int daysBorrowed=(int) java.time.temporal.ChronoUnit.DAYS.between(LocalDate.now(), borrowedAsset.getBorrowingDate());
		if(daysBorrowed-c.getLendingPeriod()>0)
			return c.getLateFeesPerDay()*(daysBorrowed-c.getLendingPeriod());
		return 0;
	}

	@Override
	public boolean isOverdue(int userId, int assetId) {
		// TODO Auto-generated method stub
		BorrowedAssets borrowedAsset=null;
		CategoryStorage cat=new CategoryStorageImpl();
		for (BorrowedAssets ba : borrowedAssetObject.getAllBorrowedAssets()) {
			if(ba.getAssetId()==assetId) {
				borrowedAsset=ba;
				break;
			}
		}
		Category c=cat.getCategory(assetId);
		int daysBorrowed=(int) java.time.temporal.ChronoUnit.DAYS.between(LocalDate.now(), borrowedAsset.getBorrowingDate());
		if(daysBorrowed-c.getLendingPeriod()>0)
			return true;
		return false;
	}

}
