package com.example.demo.JwtToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.User;
import com.example.demo.Service.CustomerUserDetailsService;

import java.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter  {
	
	
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private CustomerUserDetailsService userDetailsService;
	
	
	@Override
	protected void doFilterInternal(
			HttpServletRequest request,
			HttpServletResponse response,
			FilterChain filterChain
			) throws ServletException, IOException{
		
		
		String path = request.getServletPath();
		
		if(path.startsWith("/api/auth")) {
			filterChain.doFilter(request, response);
		}
		
		if("OPTIONS".equalsIgnoreCase(request.getMethod())) {
			filterChain.doFilter(request, response);
			return;
		}
		
		
		
		String authHeader = request.getHeader("Authorization");
		
		if(authHeader != null && authHeader.startsWith("Bearer ")) {
			String token = authHeader.substring(7);
			
			if(jwtUtil.isTokenValid(token)) {
				
				
				
				String email = jwtUtil.extractEmail(token);
				
//				UserDetails userDetails = userDetailsService.loadUserByUsername(email);
				
				User user = (User) userDetailsService.loadUserByUsername(email);
				
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
						user,
						null,
						user.getAuthorities());
					
					
					SecurityContextHolder.getContext().setAuthentication(authToken);
					System.out.println("Authroiztion" + user.getAuthorities());
					System.out.println("working in the");
				};
			}
		filterChain.doFilter(request, response);
		}

}
