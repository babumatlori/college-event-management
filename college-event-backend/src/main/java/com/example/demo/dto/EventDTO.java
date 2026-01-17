package com.example.demo.dto;

public class EventDTO {
	
	private Long id;
	private String title;
	private String description;
	private String date;
	private String place;
	
	
	public EventDTO(Long id, String title, String description, String date, String place) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.date = date;
		this.place = place;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getDescription() {
		return description;
	}


	public void setDesc(String description) {
		this.description = description;
	}


	public String getDate() {
		return date;
	}


	public void setDate(String date) {
		this.date = date;
	}


	public String getPlace() {
		return place;
	}


	public void setPlace(String place) {
		this.place = place;
	}
	
	
	

}
