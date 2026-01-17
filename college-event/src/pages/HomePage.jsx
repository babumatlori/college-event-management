import React, { useContext } from "react";
import "./HomePage.css";
import EventsContext from "./EventsContextPage";
import AuthContext from "./AuthContextPage";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { events, registerEvent, myEvents = [] } = useContext(EventsContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async(eventId, title) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    try{
      await
    registerEvent(eventId);
    navigate("/myevents", {
      state: { message: `Successfully registered for ${title}` },
    });
  }catch(error){
    alert("failed to register, try again later",error.message);
  }
  };

  return (
    <div className="home-container">
      <h1>Upcoming College Events</h1>

      <div className="events-list">
        {events?.length === 0 ? (
          <p>No upcoming events available</p>
        ) : (
          events?.map((event) => {
            const isRegistered = myEvents?.some(
              (reg) => reg?.event?.id === event.id
            );

            return (
              <div key={event.id} className="event-cards">
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p>
                  <strong>Date:</strong> {event.date}
                </p>
                <p>
                  <strong>Place:</strong> {event.place}
                </p>
                {isRegistered ? (
                  <button className="Homeregistered-btn" disabled>
                    Registered
                  </button>
                ) : (
                  <button
                    onClick={() => handleRegister(event.id, event.title)}
                    className="Homeregister-btn"
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

export default HomePage;
