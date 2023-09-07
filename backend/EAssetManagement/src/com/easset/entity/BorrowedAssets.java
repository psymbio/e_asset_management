package com.easset.entity;

import java.time.LocalDate;
import java.util.Objects;

public class BorrowedAssets {
	private int id;
	private int assetId;
	private int userId;
	private LocalDate borrowingDate;
	public BorrowedAssets() {
		super();
		// TODO Auto-generated constructor stub
	}
	public BorrowedAssets(int id, int assetId, int userId, LocalDate borrowingDate) {
		super();
		this.id = id;
		this.assetId = assetId;
		this.userId = userId;
		this.borrowingDate = borrowingDate;
	}
	@Override
	public String toString() {
		return "BorrowedAssets [id=" + id + ", assetId=" + assetId + ", userId=" + userId + ", borrowingDate="
				+ borrowingDate + "]";
	}
	@Override
	public int hashCode() {
		return Objects.hash(assetId, borrowingDate, id, userId);
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
				&& userId == other.userId;
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
