package com.easset.exceptions;

import java.io.PrintStream;
import java.io.PrintWriter;

public class UserAlreadyExistsException extends Exception {
    /**
	 * 
	 */
	private static final long serialVersionUID = 4543933972920261435L;

	public UserAlreadyExistsException() {
        super();
    }

    public UserAlreadyExistsException(String message) {
        super(message);
    }

    public UserAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserAlreadyExistsException(Throwable cause) {
        super(cause);
    }
}
