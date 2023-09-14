package com.easset.exceptions;

public class AssetNotFoundException extends Exception {
	public AssetNotFoundException() {
        super();
    }

    public AssetNotFoundException(String message) {
        super(message);
    }

    public AssetNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public AssetNotFoundException(Throwable cause) {
        super(cause);
    }
}
