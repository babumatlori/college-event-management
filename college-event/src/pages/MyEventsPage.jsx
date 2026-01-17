import React, { useContext } from "react";
import "./MyRegisterPage.css";
import EventsContext from "./EventsContextPage";
import AuthContext from "./AuthContextPage";
import { useLocation } from "react-router-dom";

const MyEventsPage = () => {
  const { myEvents, cancelEvent } = useContext(EventsContext);
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const successMessage = location.state?.message;


  // Only show events the logged in user registered for
if(!currentUser){
  return <p>Please log to see your events.</p>;
}
  return (
    <div className="myevents-cont">
      <h2>My Registered Events</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {myEvents.length === 0 ?(
        <p>You have not register any events</p>
      ):(
        <div className="myevents-grid">
          {myEvents.map((reg)=>{
            const event = reg.event;
            return (
              <div className="myevent-card" key={event.title}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Place:</strong> {event.place}</p>
                <button className="cancel-btn" onClick={()=> cancelEvent(event.id)}>
                  Cancel Registration
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default MyEventsPage;
