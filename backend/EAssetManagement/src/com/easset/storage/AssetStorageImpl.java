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
	                 "INSERT INTO ASSET (name, categoryId, description, dateAdded, isAvailable) VALUES (?, ?, ?, ?, ?)")) {

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
	         PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM ASSET WHERE id = ?")) {

	        preparedStatement.setInt(1, assetId);

	        try (ResultSet resultSet = preparedStatement.executeQuery()) {
	            if (resultSet.next()) {
	                Asset asset = new Asset();
	                asset.setId(resultSet.getInt("id"));
	                asset.setName(resultSet.getString("name"));
	                asset.setCategoryId(resultSet.getInt("categoryId"));
	                asset.setDescription(resultSet.getString("description"));
	                asset.setDateAdded(resultSet.getDate("dateAdded").toLocalDate());
	                asset.setAvailable(resultSet.getBoolean("isAvailable"));
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
	            asset.setId(resultSet.getInt("id"));
	            asset.setName(resultSet.getString("name"));
	            asset.setCategoryId(resultSet.getInt("categoryId"));
	            asset.setDescription(resultSet.getString("description"));
	            asset.setDateAdded(resultSet.getDate("dateAdded").toLocalDate());
	            asset.setAvailable(resultSet.getBoolean("isAvailable"));
	            assets.add(asset);
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return assets;
	}
}
