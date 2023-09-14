package com.easset.exceptions;

public class CategoryAlreadyExistsException extends Exception {
	public CategoryAlreadyExistsException() {
        super();
    }

    public CategoryAlreadyExistsException(String message) {
        super(message);
    }

    public CategoryAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }

    public CategoryAlreadyExistsException(Throwable cause) {
        super(cause);
    }
}
