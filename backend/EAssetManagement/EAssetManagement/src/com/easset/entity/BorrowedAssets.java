package com.easset.entity;

import java.time.LocalDate;
import java.util.Objects;

public class BorrowedAssets {
	private int id;
	private int assetId;
	private int userId;
	private boolean isReturned;
	private LocalDate borrowingDate;
	public BorrowedAssets() {
		super();
		// TODO Auto-generated constructor stub
	}
	public BorrowedAssets(int id, int assetId, int userId, LocalDate borrowingDate, boolean isReturned) {
		super();
		this.id = id;
		this.assetId = assetId;
		this.userId = userId;
		this.borrowingDate = borrowingDate;
		this.isReturned=isReturned;
	}
	public boolean isReturned() {
		return isReturned;
	}
	public void setReturned(boolean isReturned) {
		this.isReturned = isReturned;
	}
	@Override
	public int hashCode() {
		return Objects.hash(assetId, borrowingDate, id, isReturned, userId);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BorrowedAssets other = (BorrowedAssets) obj;
		return assetId == other.assetId && Objects.equals(borrowingDate, other.borrowingDate) && id == other.id
				&& isReturned == other.isReturned && userId == other.userId;
	}
	@Override
	public String toString() {
		return "BorrowedAssets [id=" + id + ", assetId=" + assetId + ", userId=" + userId + ", isReturned=" + isReturned
				+ ", borrowingDate=" + borrowingDate + "]";
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getAssetId() {
		return assetId;
	}
	public void setAssetId(int assetId) {
		this.assetId = assetId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public LocalDate getBorrowingDate() {
		return borrowingDate;
	}
	public void setBorrowingDate(LocalDate borrowingDate) {
		this.borrowingDate = borrowingDate;
	}
}
