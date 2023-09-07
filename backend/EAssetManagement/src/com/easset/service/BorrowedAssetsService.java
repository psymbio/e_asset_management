package com.easset.service;

import java.util.List;

import com.easset.entity.BorrowedAssets;
import com.easset.exceptions.AssetNotFoundException;
import com.easset.exceptions.UserBannedException;
import com.easset.utils.BorrowedAssetsFinder;

public interface BorrowedAssetsService {
	public boolean addBorrowedAsset(int userId, int assetId) throws AssetNotFoundException, UserBannedException;
	public boolean removeBorrowedAsset(int userId, int assetId) throws AssetNotFoundException;
	public List<BorrowedAssets> getAllBorrowedAssets();
	public List<BorrowedAssets> filterBorrowedAssets(BorrowedAssetsFinder baf);
	public float calculateLateFees(int userId, int assetId);
	public boolean isOverdue(int userId, int assetId);
}
