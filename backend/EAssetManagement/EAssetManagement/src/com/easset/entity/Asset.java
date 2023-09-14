package com.easset.entity;

import java.time.LocalDate;
import java.util.Objects;

public class Asset {
	private int id;
	private String name;
	private int categoryId;
	private String description;
	private boolean isAvailable;
	private LocalDate dateAdded;
	public Asset() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Asset(int id, String name, int categoryId, String description, boolean isAvailable, LocalDate dateAdded) {
		super();
		this.id = id;
		this.name = name;
		this.categoryId = categoryId;
		this.description = description;
		this.isAvailable = isAvailable;
		this.dateAdded = dateAdded;
	}
	@Override
	public String toString() {
		return "Asset [id=" + id + ", name=" + name + ", categoryId=" + categoryId + ", description=" + description
				+ ", isAvailable=" + isAvailable + ", dateAdded=" + dateAdded + "]";
	}
	@Override
	public int hashCode() {
		return Objects.hash(categoryId, dateAdded, description, id, isAvailable, name);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Asset other = (Asset) obj;
		return categoryId == other.categoryId && Objects.equals(dateAdded, other.dateAdded)
				&& Objects.equals(description, other.description) && id == other.id && isAvailable == other.isAvailable
				&& Objects.equals(name, other.name);
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public boolean getIsAvailable() {
		return isAvailable;
	}
	public void setAvailable(boolean isAvailable) {
		this.isAvailable = isAvailable;
	}
	public LocalDate getDateAdded() {
		return dateAdded;
	}
	public void setDateAdded(LocalDate dateAdded) {
		this.dateAdded = dateAdded;
	}
}
