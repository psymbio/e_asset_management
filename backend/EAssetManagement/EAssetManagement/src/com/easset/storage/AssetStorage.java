package com.easset.storage;

import java.util.List;

import com.easset.entity.Asset;
import com.easset.exceptions.AssetAlreadyExistsException;
import com.easset.exceptions.AssetNotFoundException;

public interface AssetStorage {
	public boolean addAsset(Asset a);
	public Asset getAsset(int assetId);
	public List<Asset> getAllAssets();
}
