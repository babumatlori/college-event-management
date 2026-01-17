package com.example.demo;

import jakarta.persistence.*;

@Entity
@Table(name="registrations")
public class Registration {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name="event_id",nullable=false)
	private Event event;

	@ManyToOne
	@JoinColumn(name="user_id",nullable=false)
	private User user;

	
	public Registration() {}


	public Registration(Event event, User user) {
		this.event = event;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
