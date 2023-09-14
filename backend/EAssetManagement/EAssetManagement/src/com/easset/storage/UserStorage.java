package com.easset.storage;

import java.util.List;

import com.easset.entity.User;
import com.easset.exceptions.UserAlreadyExistsException;
import com.easset.exceptions.UserNotFoundException;

public interface UserStorage {
	public boolean addUser(User u) throws UserAlreadyExistsException;
	public User getUser(int userId) throws UserNotFoundException;
	public List<User> getAllUsers();
}
