package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

}
