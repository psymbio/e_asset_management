package com.easset.storage;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.easset.entity.Asset;

public class AssetStorageImpl implements AssetStorage {
	private static Credentials credentials = new Credentials();
	static String url = credentials.url;
	static String username = credentials.username;
	static String password = credentials.password;
	@Override
	public boolean addAsset(Asset asset) {
	    try (Connection connection = DriverManager.getConnection(url, username, password);
	         PreparedStatement preparedStatement = connection.prepareStatement(
	                 "INSERT INTO ASSET (asset_name, category_id, asset_desc, is_available, date_added) VALUES (?, ?, ?, ?, ?)")) {

	        preparedStatement.setString(1, asset.getName());
	        preparedStatement.setInt(2, asset.getCategoryId());
	        preparedStatement.setString(3, asset.getDescription());
	        preparedStatement.setDate(4, Date.valueOf(asset.getDateAdded()));
	        preparedStatement.setBoolean(5, asset.getIsAvailable());

	        int rowsInserted = preparedStatement.executeUpdate();
	        return rowsInserted > 0;
	    } catch (SQLException e) {
	        e.printStackTrace();
	        return false;
	    }
	}


	@Override
	public Asset getAsset(int assetId) {
	    try (Connection connection = DriverManager.getConnection(url, username, password);
	         PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM ASSET WHERE asset_id = ?")) {

	        preparedStatement.setInt(1, assetId);

	        try (ResultSet resultSet = preparedStatement.executeQuery()) {
	            if (resultSet.next()) {
	                Asset asset = new Asset();
	                asset.setId(resultSet.getInt("asset_id"));
	                asset.setName(resultSet.getString("asset_name"));
	                asset.setCategoryId(resultSet.getInt("category_id"));
	                asset.setDescription(resultSet.getString("asset_desc"));
	                asset.setAvailable(resultSet.getBoolean("is_available"));
	                asset.setDateAdded(resultSet.getDate("date_added").toLocalDate());
	                return asset;
	            }
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return null; // Asset not found or error occurred.
	}

	@Override
	public List<Asset> getAllAssets() {
	    List<Asset> assets = new ArrayList<>();

	    try (Connection connection = DriverManager.getConnection(url, username, password);
	         Statement statement = connection.createStatement();
	         ResultSet resultSet = statement.executeQuery("SELECT * FROM ASSET")) {

	        while (resultSet.next()) {
	            Asset asset = new Asset();
	            asset.setId(resultSet.getInt("asset_id"));
                asset.setName(resultSet.getString("asset_name"));
                asset.setCategoryId(resultSet.getInt("category_id"));
                asset.setDescription(resultSet.getString("asset_desc"));
                asset.setAvailable(resultSet.getBoolean("is_available"));
                asset.setDateAdded(resultSet.getDate("date_added").toLocalDate());
	            assets.add(asset);
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return assets;
	}
}
