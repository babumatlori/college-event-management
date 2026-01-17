package com.example.demo.JwtToken;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;


@Component
public class JwtUtil {
	
    // Token validity: 1 day
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;
//    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final String SECERT = "my-college-event-secret-key-123456789";
    
    private final Key key = Keys.hmacShaKeyFor(SECERT.getBytes());
    

    // Generate token

	public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    // Extract email

	public String extractEmail(String token) {
        return  getClaims(token)
        		.getSubject();
    }

    // Extract role

	public String extractRole(String token) {
        return 
        		getClaims(token)
        	
        		.get("role",String.class);
        		
    }
    
    private Claims getClaims(String token) {
    	return Jwts.parserBuilder()
    			.setSigningKey(key)
    			.build()
    			.parseClaimsJws(token)
    			.getBody();
    }

//   vaid token

	public boolean isTokenValid(String token) {
    	try {
    		getClaims(token);
    		return true;
    	}catch (Exception e) {
    	return false;
    }
    }
}
