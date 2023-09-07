package com.easset.exceptions;

public class AssetAlreadyExistsException extends Exception {
	public AssetAlreadyExistsException() {
        super();
    }

    public AssetAlreadyExistsException(String message) {
        super(message);
    }

    public AssetAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }

    public AssetAlreadyExistsException(Throwable cause) {
        super(cause);
    }
}
