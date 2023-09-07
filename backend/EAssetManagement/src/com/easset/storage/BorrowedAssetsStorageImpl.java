package com.easset.storage;

import java.util.List;

import com.easset.entity.BorrowedAssets;

public class BorrowedAssetsStorageImpl implements BorrowedAssetsStorage {
	private static Credentials credentials = new Credentials();
	static String url = credentials.url;
	static String username = credentials.username;
	static String password = credentials.password;
	@Override
	public boolean addBorrowedAsset(int userId, int assetId) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean removeBorrowedAsset(int userId, int assetId) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<BorrowedAssets> getAllBorrowedAssets() {
		// TODO Auto-generated method stub
		return null;
	}

}
