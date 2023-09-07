package com.easset.storage;

import java.util.List;

import com.easset.entity.BorrowedAssets;
import com.easset.exceptions.AssetNotFoundException;
import com.easset.exceptions.UserBannedException;

public interface BorrowedAssetsStorage {
	public boolean addBorrowedAsset(int userId, int assetId);
	public boolean removeBorrowedAsset(int userId, int assetId);
	public List<BorrowedAssets> getAllBorrowedAssets();
}
