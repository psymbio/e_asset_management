package com.easset.exceptions;

public class UserInputValidationException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5774301723554775921L;

	public UserInputValidationException() {
        super();
    }

    public UserInputValidationException(String message) {
        super(message);
    }

    public UserInputValidationException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserInputValidationException(Throwable cause) {
        super(cause);
    }
}
