package com.easset.storage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.easset.entity.User;
import com.easset.exceptions.UserAlreadyExistsException;
import com.easset.exceptions.UserNotFoundException;

public class UserStorageImpl implements UserStorage {
	private static Credentials credentials = new Credentials();
	static String url = credentials.url;
	static String username = credentials.username;
	static String password = credentials.password;
	@Override
    public boolean addUser(User u) throws UserAlreadyExistsException {
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            String sql = "INSERT INTO USER (user_name, user_role, telephone, email, username, pswd) VALUES (?, ?, ?, ?, ?, ?)";
            try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
                statement.setString(1, u.getName());
                statement.setString(2, u.getRole());
                statement.setString(3, u.getTelephone());
                statement.setString(4, u.getEmail());
                statement.setString(5, u.getUsername());
                statement.setString(6, u.getPassword());

                int rowsInserted = statement.executeUpdate();
                if (rowsInserted > 0) {
                    ResultSet generatedKeys = statement.getGeneratedKeys();
                    if (generatedKeys.next()) {
                        u.setId(generatedKeys.getInt(1));
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            if (e.getMessage().contains("Duplicate entry")) {
                throw new UserAlreadyExistsException("User with the same username or email already exists.");
            } else {
                e.printStackTrace(); // Handle the exception appropriately
            }
        }
        return false;
    }

    @Override
    public User getUser(int userId) throws UserNotFoundException {
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            String sql = "SELECT user_id, user_name, user_role, telephone, email, username, pswd FROM USER WHERE user_id = ?";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setInt(1, userId);

                try (ResultSet resultSet = statement.executeQuery()) {
                    if (resultSet.next()) {
                        User user = new User();
                        user.setId(resultSet.getInt("user_id"));
                        user.setName(resultSet.getString("user_name"));
                        user.setRole(resultSet.getString("user_role"));
                        user.setTelephone(resultSet.getString("telephone"));
                        user.setEmail(resultSet.getString("email"));
                        user.setUsername(resultSet.getString("username"));
                        user.setPassword("[redacted for safety]");
                        return user;
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Handle the exception appropriately
        }
        throw new UserNotFoundException("User with ID " + userId + " not found.");
    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            String sql = "SELECT user_id, user_name, user_role, telephone, email, username, pswd FROM USER";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        User user = new User();
                        user.setId(resultSet.getInt("user_id"));
                        user.setName(resultSet.getString("user_name"));
                        user.setRole(resultSet.getString("user_role"));
                        user.setTelephone(resultSet.getString("telephone"));
                        user.setEmail(resultSet.getString("email"));
                        user.setUsername(resultSet.getString("username"));
                        user.setPassword("[redacted for safety]");
                        users.add(user);
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Handle the exception appropriately
        }
        return users;
    }
}
