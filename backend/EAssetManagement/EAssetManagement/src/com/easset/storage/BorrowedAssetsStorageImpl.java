package com.easset.storage;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.easset.entity.BorrowedAssets;

public class BorrowedAssetsStorageImpl implements BorrowedAssetsStorage {
	private static Credentials credentials = new Credentials();
	static String url = credentials.url;
	static String username = credentials.username;
	static String password = credentials.password;
	@Override
	public boolean addBorrowedAsset(int userId, int assetId) {
		 try (Connection connection = DriverManager.getConnection(url, username, password);
		         PreparedStatement preparedStatement = connection.prepareStatement(
		                 "INSERT INTO BORROWEDASSET ( asset_id, user_id, is_returned, borrowing_date) VALUES ( ?, ?, ?, ?)")) {
			 	
		        preparedStatement.setInt(1, assetId);
		        preparedStatement.setInt(2, userId);
		        preparedStatement.setInt(3, 0);
		        preparedStatement.setDate(4, Date.valueOf(LocalDate.now()));

		        int rowsInserted = preparedStatement.executeUpdate();
		        return rowsInserted > 0;
		    } catch (SQLException e) {
		        e.printStackTrace();
		        return false;
		    }
	}

	@Override
	public boolean removeBorrowedAsset(int userId, int assetId) {
		try (Connection connection = DriverManager.getConnection(url, username, password);
		         PreparedStatement preparedStatement = connection.prepareStatement(
		                 "UPDATE BORROWEDASSET SET is_returned=? WHERE asset_Id=?")) {
			 	
		        preparedStatement.setInt(1, 1);
		        preparedStatement.setInt(2, assetId);

		        int rowsInserted = preparedStatement.executeUpdate();
		        return rowsInserted > 0;
		    } catch (SQLException e) {
		        e.printStackTrace();
		        return false;
		    }
	}

	@Override
	public List<BorrowedAssets> getAllBorrowedAssets() {
		try (Connection connection = DriverManager.getConnection(url, username, password);
		         PreparedStatement preparedStatement = connection.prepareStatement(
		                 "SELECT * FROM borrowedasset")) {
			 	
				ResultSet rs=preparedStatement.executeQuery();
				List<BorrowedAssets> assetList=new ArrayList<>();
				while(rs.next()) {
					BorrowedAssets a=new BorrowedAssets(rs.getInt(1), rs.getInt(2), rs.getInt(3), rs.getDate(4).toLocalDate(), rs.getBoolean(5));
					assetList.add(a);
				}
		        return assetList;
		    } catch (SQLException e) {
		        e.printStackTrace();
		        return null;
		    }
	}

}
