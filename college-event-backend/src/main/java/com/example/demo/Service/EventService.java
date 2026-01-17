package com.example.demo.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

import com.example.demo.Event;
import com.example.demo.Repository.EventRepository;

@Service
public class EventService {

	private final EventRepository eventRepository;
	
	public EventService(EventRepository eventRepository) {
		this.eventRepository= eventRepository;
	}
	
	public List<Event> getAllEvents(){
		return eventRepository.findAll();
	}
	
	public Optional<Event> getEventById(Long id){
		return eventRepository.findById(id);
	}
	
	public Event addEvent(Event event) {
		return eventRepository.save(event);
	}
	
	public Event updateEvent(Long id, Event eventDetails) {
		return eventRepository.findById(id).map(event->{
			event.setTitle(eventDetails.getTitle());
			event.setDescription(eventDetails.getDescription());
			event.setDate(eventDetails.getDate());
			event.setPlace(eventDetails.getPlace());
			
			return eventRepository.save(event);
		}).orElseThrow(()-> new RuntimeException("evnt not found with id "+id));
	}
	
	public void deleteEvent(Long id) {
		eventRepository.deleteById(id);
	}
	
}
