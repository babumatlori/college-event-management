package com.example.demo.Service;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.*;

import com.example.demo.User;
import com.example.demo.Repository.UserRepository;

@Service
public class UserService {

	private final UserRepository userRepository;
	
	public static final Logger logger= LoggerFactory.getLogger(UserService.class);

	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	public UserService(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}
	
//Register new User
	public User register (User user) {
		logger.info("Attempting registration for email: {}", user.getEmail());
		
		Optional<User> existing = userRepository.findByEmail(user.getEmail());
		if(existing.isPresent()) {
			logger.warn("Registration failed - email already exists: {}", user.getEmail());
			throw new RuntimeException ("Email already registere");
		}
		
		if(user.getRole() == null || user.getRole().isBlank()) {
			user.setRole("USER");
		}
		
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		
		User savedUser = userRepository.save(user);
		logger.info("User registered successfully: {}", user.getEmail());
		return savedUser;
	}
	 
//	login User
	public User login(String email, String password) {
		logger.info("login attempted for email: {}", email);
		User user = userRepository.findByEmail(email).orElseThrow(() -> {
			logger.warn("Login failed - user not found: {}", email);
			return new RuntimeException("User not found");
		});
		
		if(!passwordEncoder.matches(password, user.getPassword())) {
			logger.warn("Login failed - invalied password for email: {}", email);
			throw new RuntimeException ("Invalid credentails");
		}
		
		logger.info("Login successful for email: {}", email);
		return user;
	}
	
	
}
