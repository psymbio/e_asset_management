package com.easset.exceptions;

public class UserBannedException extends Exception {
	public UserBannedException() {
        super();
    }

    public UserBannedException(String message) {
        super(message);
    }

    public UserBannedException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserBannedException(Throwable cause) {
        super(cause);
    }
}
