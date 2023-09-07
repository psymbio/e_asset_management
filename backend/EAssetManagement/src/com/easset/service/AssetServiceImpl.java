package com.easset.service;

import java.util.ArrayList;
import java.util.List;

import com.easset.entity.Asset;
import com.easset.exceptions.AssetAlreadyExistsException;
import com.easset.exceptions.AssetNotFoundException;
import com.easset.storage.AssetStorage;
import com.easset.storage.AssetStorageImpl;
import com.easset.utils.AssetFinder;

public class AssetServiceImpl implements AssetService {
	static AssetStorage assetStorageObject = new AssetStorageImpl();
	@Override
	public boolean addAsset(Asset a) throws AssetAlreadyExistsException {
		boolean addedStatus = assetStorageObject.addAsset(a);
		if (addedStatus == true) {
			return true;
		}
		throw new AssetAlreadyExistsException("The asset you are adding already exists.");
	}

	@Override
	public Asset getAsset(int assetId) throws AssetNotFoundException {
		Asset a = assetStorageObject.getAsset(assetId);
		if (a != null) {
			return a;
		}
		throw new AssetNotFoundException("The asset with id " + assetId + "doesn't exist.");
	}

	@Override
	public List<Asset> getAllAssets() {
		return assetStorageObject.getAllAssets();
	}

	@Override
	public List<Asset> filterAssets(List<Asset> allAssets, AssetFinder af) {
		List<Asset> filteredAssets = new ArrayList<Asset>();
		for (Asset a : allAssets) {
			if (af.findAsset(a)) {
				filteredAssets.add(a);
			}
		}
		return filteredAssets;
	}

}
