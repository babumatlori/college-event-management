import React, { useState, useContext } from "react";
import "./EventsPage.css";
import EventsContext from "./EventsContextPage";
import AuthContext from "./AuthContextPage";
import { useNavigate } from "react-router-dom";

const EventsPage = () => {
  const { events, registerEvent, myEvents } = useContext(EventsContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
//search
  const filterEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );


 const handleRegister = async(eventId, title)=>{
  if(!currentUser){
    navigate("/login");
    return;
  }
  try{
    await
  registerEvent(eventId);
  navigate("/myevents",{ state:{message:`Successfully registered for ${title}`}});
  }catch(error){
    alert("failed to register , try again later",error.message);
  }
 };

  return (
    <div className="events-cont">
      <h1>All Events</h1>
      {/* search */}
      <input
        type="text"
        placeholder="Search events"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

{/* event */}
      <div className="events-grid">
        {filterEvents.length === 0 ? (
          <p>No events found</p>

        ) : (
          filterEvents.map((event) => {
            const isRegistered = myEvents.some((reg)=> reg.event.id===event.id);

            return (
              <div className="event-card" key={event.id}>
                <h2>{event.title}</h2>
                <p>{event.description || event.description}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Place:</strong> {event.place}</p>

                {isRegistered ? (
                  <button className="eventRegistered-btn" disabled>
                    Registered
                  </button>
                ) : (
                  <button
                    className="register-btn"
                    onClick={() => handleRegister(event.id, event.title)}
                  >
                    Register
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EventsPage;
