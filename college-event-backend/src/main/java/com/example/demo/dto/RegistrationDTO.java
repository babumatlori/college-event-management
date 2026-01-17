package com.example.demo.dto;

public class RegistrationDTO {
	
	private Long id; 
	private UserDto user;
	private EventDTO event;
	public RegistrationDTO(Long id, UserDto user, EventDTO event) {
		super();
		this.id = id;
		this.user = user;
		this.event = event;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public UserDto getUser() {
		return user;
	}
	public void setUser(UserDto user) {
		this.user = user;
	}
	public EventDTO getEvent() {
		return event;
	}
	public void setEvent(EventDTO event) {
		this.event = event;
	}

	
	
}
