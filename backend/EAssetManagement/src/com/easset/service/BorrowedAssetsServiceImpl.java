package com.easset.service;

import java.util.List;

import com.easset.entity.BorrowedAssets;
import com.easset.exceptions.AssetNotFoundException;
import com.easset.exceptions.UserBannedException;
import com.easset.utils.BorrowedAssetsFinder;

public class BorrowedAssetsServiceImpl implements BorrowedAssetsService {

	@Override
	public boolean addBorrowedAsset(int userId, int assetId) throws AssetNotFoundException, UserBannedException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean removeBorrowedAsset(int userId, int assetId)  throws AssetNotFoundException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<BorrowedAssets> getAllBorrowedAssets() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<BorrowedAssets> filterBorrowedAssets(BorrowedAssetsFinder baf) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public float calculateLateFees(int userId, int assetId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public boolean isOverdue(int userId, int assetId) {
		// TODO Auto-generated method stub
		return false;
	}

}
