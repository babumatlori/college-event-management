package com.example.demo.Contoller;

import java.util.Map;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.example.demo.User;
import com.example.demo.JwtToken.JwtUtil;
import com.example.demo.Service.UserService;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins="http://localhost:5173")
public class AuthContoller {
	
	public static final org.slf4j.Logger logger= LoggerFactory.getLogger(AuthContoller.class);
	private final JwtUtil jwtUtil;
	private final UserService userServies;

	public AuthContoller(UserService userServies, JwtUtil jwtUtil) {
		super();
		this.userServies = userServies;
		this.jwtUtil = jwtUtil;
	}
	
	//registration new user
	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody User user){
		logger.info("Register req: "+user);
		
		User seavedUser=userServies.register(user);
		System.out.println("registered: "+seavedUser);
		return ResponseEntity.ok(seavedUser);
	}
	
//	Login user
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User loginRequest) {
		User user = userServies.login(loginRequest.getEmail(), loginRequest.getPassword());
		String token = jwtUtil.generateToken(user.getEmail(),user.getRole());
		return ResponseEntity.ok(
				Map.of(
						"token", token,
						"user", user));	
	}
}
