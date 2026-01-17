package com.example.demo.Contoller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Registration;
import com.example.demo.Service.RegistrationService;
import com.example.demo.dto.RegistrationDTO;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins="http://localhost:5173")
public class RegistrationController {
	private final RegistrationService regService;

	
	public RegistrationController(RegistrationService regService) {
		this.regService = regService;
	}
	
//	registration user to event
	@PostMapping("/{eventId}")
	public Registration register(@PathVariable Long eventId, Authentication authentication) {
		
		String email = authentication.getName();
		
		return regService.registerByEmail(email, eventId);
	}
	
//	unregistration
	@DeleteMapping("/{userId}/{eventId}")
	public ResponseEntity<String> unRegister(@PathVariable Long userId, @PathVariable Long eventId) {
	    regService.unRegisterUser(userId, eventId);
	    return ResponseEntity.ok("Participant removed successfully");
	}
	
//	get users event
	@GetMapping("/user/{userId}")
	public List<RegistrationDTO> getUserEvents(@PathVariable Long userId){
		return regService.getUserRegistration(userId);	
	}
	
	
	@GetMapping("/my")
	public List<Registration> getMyEvents(Authentication authentication){
		
		if(authentication == null) {
			throw new RuntimeException("Unauthorized");
		}
	
	String email = authentication.getName();
	
	return regService.getEventsByUserEmail(email);
	}
	
	
//	get par for event
	@GetMapping("/event/{eventId}")
	public List<RegistrationDTO> getEventPara(@PathVariable Long eventId){
		return regService.getEventPara(eventId);
	}
}
