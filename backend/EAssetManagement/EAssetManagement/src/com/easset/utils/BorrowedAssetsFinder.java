package com.easset.utils;

import com.easset.entity.BorrowedAssets;

public interface BorrowedAssetsFinder {
	// lambda function to find by a filter
	public boolean findBorrowedAssets(BorrowedAssets ba);
}
