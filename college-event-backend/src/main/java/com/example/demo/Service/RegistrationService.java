package com.example.demo.Service;

import java.util.List;

import org.springframework.stereotype.*;

import com.example.demo.Event;
import com.example.demo.Registration;
import com.example.demo.User;
import com.example.demo.Repository.EventRepository;
import com.example.demo.Repository.RegistrationRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.dto.EventDTO;
import com.example.demo.dto.RegistrationDTO;
import com.example.demo.dto.UserDto;

@Service
	public class RegistrationService {
	private final RegistrationRepository registrationRepository;
	private final UserRepository userRepository;
	private final EventRepository eventRepository;
	
	public RegistrationService(RegistrationRepository registrationRepository, UserRepository userRepository,
			EventRepository eventRepository) {
		this.registrationRepository = registrationRepository;
		this.userRepository = userRepository;
		this.eventRepository = eventRepository;
	}
	
//Registory for event
	public Registration registrationUserForEvent(Long userId, Long eventId) {
		if(registrationRepository.existsByUserIdAndEventId(userId, eventId)) {
			throw new RuntimeException("event is registered");
		}
   User us = userRepository.findById(userId).orElseThrow(()-> new RuntimeException("user no tfound"));
   Event ev = eventRepository.findById(eventId).orElseThrow(()->new RuntimeException("no event found "));

   Registration reg = new Registration(ev,us);
   return registrationRepository.save(reg);
	}
	
//cancel reg
	public void unRegisterUser(Long userId, Long eventId) {
	    Registration reg = registrationRepository.findByUserId(userId).stream()
	        .filter(r -> r.getEvent().getId().equals(eventId))
	        .findFirst()
	        .orElseThrow(() -> new RuntimeException("Registration not found"));
	    registrationRepository.delete(reg);
	}
	
	
//	registerBy email;
	
	public Registration registerByEmail (String email, Long eventId) {
		
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new
						RuntimeException("User not found"));
		
		Event event = eventRepository.findById(eventId)
				.orElseThrow(() -> new
						RuntimeException("Event not found"));
		
		if (registrationRepository.existsByUserIdAndEventId(user.getId(), event.getId())) {
			throw new RuntimeException("Already registered");
			
		}
		
		return registrationRepository.save(new Registration(event, user));
	}

	
	public List<Registration> getEventsByUserEmail(String email) {
		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
		
		return registrationRepository.findByUserId(user.getId());
	}
	
	
//get all evnts for user
	public List<RegistrationDTO> getUserRegistration(Long userId){
		return registrationRepository.findByUserId(userId)
				.stream()
				.map(this::mapToDTO)
				.toList();
	}
	
//get all par for events
	public List<RegistrationDTO> getEventPara(Long eventId){
		return registrationRepository.findByEventId(eventId)
				.stream()
				.map(this::mapToDTO)
				.toList();
	}
	
	private RegistrationDTO mapToDTO(Registration reg) {
		UserDto userDto = new UserDto(
				reg.getUser().getId(),
				reg.getUser().getName(),
				reg.getUser().getEmail()
				);
		
		EventDTO eventDTO = new EventDTO (
				reg.getEvent().getId(),
				reg.getEvent().getTitle(),
				reg.getEvent().getDate(),
				reg.getEvent().getDescription(),
				reg.getEvent().getPlace()
				);
		
		return new RegistrationDTO(
				reg.getId(),
				userDto,
				eventDTO
				
				);
	}
}
