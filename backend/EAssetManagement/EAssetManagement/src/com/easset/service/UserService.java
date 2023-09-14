package com.easset.service;

import java.util.List;

import com.easset.entity.User;
import com.easset.exceptions.UserAlreadyExistsException;
import com.easset.exceptions.UserInputValidationException;
import com.easset.exceptions.UserNotFoundException;

public interface UserService {
	public boolean addUser(User u) throws UserAlreadyExistsException, UserInputValidationException;
	public User getUser(int userId) throws UserNotFoundException;
	public List<User> getAllUsers();
	public int bannedTill(int userId);
}
