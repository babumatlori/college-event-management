package com.example.demo;

import java.util.List;

import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
//import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.demo.JwtToken.JwtAuthFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	private final JwtAuthFilter jwtAuthFilter;
	
	public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
		super();
		this.jwtAuthFilter = jwtAuthFilter;
	}


	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

	    http
	        .cors(withDefaults())     
	        .csrf(csrf -> csrf.disable())
	        .sessionManagement(session ->
	            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	        )
	        .authorizeHttpRequests(auth -> auth

	        			    // PUBLIC
	        			    .requestMatchers("/api/auth/**").permitAll()
	        			    .requestMatchers(HttpMethod.GET,"/api/events").permitAll()
	        			    .requestMatchers(HttpMethod.GET, "/api/events/**").permitAll()

	        			    // ADMIN FIRST (more specific)
	        			    .requestMatchers("/api/registrations/event/**").hasRole("ADMIN")
	        			    .requestMatchers("/api/events/**").hasRole("ADMIN")

	        			    // USER
	        			    .requestMatchers("/api/registrations/my").hasAnyRole("USER", "ADMIN")
	        			    .requestMatchers("/api/registrations/*/*")
	        			        .hasAnyRole("USER", "ADMIN")

	        			    .anyRequest().authenticated()
	        			    
	        		)
	        .addFilterBefore(jwtAuthFilter,
	            UsernamePasswordAuthenticationFilter.class);

	    return http.build();
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		
		System.out.println("Working Security Config");
		CorsConfiguration config = new CorsConfiguration();
		
		config.setAllowedOrigins(List.of("http://localhost:5173"));
		
		config.setAllowedMethods(List.of("GET","POST","PUT", "DELETE", "OPTIONS"));
		
		config.setAllowedHeaders(List.of("*"));
		config.setAllowCredentials(true);
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		
		source.registerCorsConfiguration("/**", config);
		return source;
	}
	
}

  