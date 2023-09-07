package com.easset.storage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.easset.entity.Category;

public class CategoryStorageImpl implements CategoryStorage {
	private static Credentials credentials = new Credentials();
	static String url = credentials.url;
	static String username = credentials.username;
	static String password = credentials.password;
	@Override
    public boolean addCategory(Category c) {
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            String sql = "INSERT INTO CATEGORY (name, lendingPeriod, lateFeesPerDay, banningPeriod) VALUES (?, ?, ?, ?)";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, c.getName());
                statement.setInt(2, c.getLendingPeriod());
                statement.setFloat(3, c.getLateFeesPerDay());
                statement.setInt(4, c.getBanningPeriod());

                int rowsInserted = statement.executeUpdate();
                return rowsInserted > 0;
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Handle the exception appropriately
            return false;
        }
    }

	@Override
    public Category getCategory(int categoryId) {
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            String sql = "SELECT id, name, lendingPeriod, lateFeesPerDay, banningPeriod FROM CATEGORY WHERE id = ?";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setInt(1, categoryId);

                try (ResultSet resultSet = statement.executeQuery()) {
                    if (resultSet.next()) {
                        int id = resultSet.getInt("id");
                        String name = resultSet.getString("name");
                        int lendingPeriod = resultSet.getInt("lendingPeriod");
                        float lateFeesPerDay = resultSet.getFloat("lateFeesPerDay");
                        int banningPeriod = resultSet.getInt("banningPeriod");

                        return new Category(id, name, lendingPeriod, lateFeesPerDay, banningPeriod);
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Handle the exception appropriately
        }
        return null; // Return null if no category with the given ID is found
    }

    @Override
    public List<Category> getAllCategories() {
        List<Category> categories = new ArrayList<>();
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            String sql = "SELECT id, name, lendingPeriod, lateFeesPerDay, banningPeriod FROM CATEGORY";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        int id = resultSet.getInt("id");
                        String name = resultSet.getString("name");
                        int lendingPeriod = resultSet.getInt("lendingPeriod");
                        float lateFeesPerDay = resultSet.getFloat("lateFeesPerDay");
                        int banningPeriod = resultSet.getInt("banningPeriod");

                        Category category = new Category(id, name, lendingPeriod, lateFeesPerDay, banningPeriod);
                        categories.add(category);
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Handle the exception appropriately
        }
        return categories;
    }
}
