package com.easset.utils;

import com.easset.entity.Asset;

public interface AssetFinder {
	// lambda function to find by a filter
	public boolean findAsset(Asset a);
}
