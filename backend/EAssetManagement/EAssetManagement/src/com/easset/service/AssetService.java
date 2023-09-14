package com.easset.service;

import java.util.List;

import com.easset.entity.Asset;
import com.easset.exceptions.AssetAlreadyExistsException;
import com.easset.exceptions.AssetNotFoundException;
import com.easset.utils.AssetFinder;

public interface AssetService {
	public boolean addAsset(Asset a) throws AssetAlreadyExistsException;
	public Asset getAsset(int assetId) throws AssetNotFoundException;
	public List<Asset> getAllAssets();
	public List<Asset> filterAssets(List<Asset> allAssets, AssetFinder af);
}
