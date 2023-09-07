package com.easset.entity;

import java.util.Objects;

public class Category {
	private int id;
	private String name;
	private int lendingPeriod;
	private float lateFeesPerDay;
	private int banningPeriod;
	public Category() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Category(int id, String name, int lendingPeriod, float lateFeesPerDay, int banningPeriod) {
		super();
		this.id = id;
		this.name = name;
		this.lendingPeriod = lendingPeriod;
		this.lateFeesPerDay = lateFeesPerDay;
		this.banningPeriod = banningPeriod;
	}
	@Override
	public String toString() {
		return "Category [id=" + id + ", name=" + name + ", lendingPeriod=" + lendingPeriod + ", lateFeesPerDay="
				+ lateFeesPerDay + ", banningPeriod=" + banningPeriod + "]";
	}
	@Override
	public int hashCode() {
		return Objects.hash(banningPeriod, id, lateFeesPerDay, lendingPeriod, name);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Category other = (Category) obj;
		return banningPeriod == other.banningPeriod && id == other.id
				&& Float.floatToIntBits(lateFeesPerDay) == Float.floatToIntBits(other.lateFeesPerDay)
				&& lendingPeriod == other.lendingPeriod && Objects.equals(name, other.name);
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
	public int getLendingPeriod() {
		return lendingPeriod;
	}
	public void setLendingPeriod(int lendingPeriod) {
		this.lendingPeriod = lendingPeriod;
	}
	public float getLateFeesPerDay() {
		return lateFeesPerDay;
	}
	public void setLateFeesPerDay(float lateFeesPerDay) {
		this.lateFeesPerDay = lateFeesPerDay;
	}
	public int getBanningPeriod() {
		return banningPeriod;
	}
	public void setBanningPeriod(int banningPeriod) {
		this.banningPeriod = banningPeriod;
	}
}
