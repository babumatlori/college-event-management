package com.example.demo.Service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.UserRepository;


@Service
public class CustomerUserDetailsService implements UserDetailsService{
	
	private final UserRepository useRepository;
	
	

	public CustomerUserDetailsService(UserRepository useRepository) {
		super();
		this.useRepository = useRepository;
	}



	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return useRepository.findByEmail(email)
				.orElseThrow(() ->
				new UsernameNotFoundException("User not found: "+ email));
				
	}
	
	
}
