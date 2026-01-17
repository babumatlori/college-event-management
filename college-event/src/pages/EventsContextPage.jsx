import { Children, createContext, useContext, useEffect, useState, useCallback } from "react";
import AuthContext from "./AuthContextPage";
// import axios from "axios";
import api from "../api/axiosConfig";



const EventsContext = createContext();
// let eventUrl="http://localhost:8081/api/events";
// let registrationUrl="http://localhost:8081/api/registrations";

export const EventsProvider = ({children})=>{
  const auth = useContext(AuthContext);
  const currentUser = auth?.currentUser;

  const [events, setEvents]= useState([]);
  const[ myEvents, setMyEvents]= useState([]);
//fetch data
  const fetchEvents=async()=>{
    try{
      const res= await api.get("/events");
      setEvents(res.data);
    }catch(error){
      console.error("failed to load events:",error);
    }
  };



  //fetch data of regis
  const fetchMyEvents= useCallback(async()=>{

    if(!currentUser || localStorage.getItem("token"))

      return;
    try{
      const res = await api.get("/registrations/my")
      setMyEvents(res.data); //BE retunr registration obj with event and user;
    }catch(error){
      console.error("falied to load my events:",error);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchMyEvents();
  }, [fetchMyEvents]);

  useEffect(()=>{
     if (!auth?.token) return;
    fetchEvents();
  },[auth?.token]);

  useEffect(()=>{
    if(!auth?.token && currentUser)
    fetchMyEvents();
  },[currentUser, fetchMyEvents,auth?.token]);

  // regis
  const registerEvent=async (eventId)=>{
    if(!currentUser) return;
    try{
      await api.post(`/registrations/${eventId}`);
      await fetchMyEvents(); // refersh users regi
      alert("succesfuly registered");
    }catch(error){
      console.error("failed to regist",error);
      alert("Alredy regist or try again later");
    }
  };

// add events

  const AddEvents = async (eventData) => {
    try{

      const res = await api.post("/events", eventData);
      setEvents([...events, res.data]);
      await fetchEvents();
    }catch(error) {
      console.error("failed to add event:", error);
    }
  }

  //cancel event
  const cancelEvent= async (eventId)=>{
    if(!currentUser) return;
    try{
      // await axios.delete(`${registrationUrl}/${currentUser.id}/${eventId}`);
      await api.delete(`/registrations/${currentUser.id}/${eventId}`);
      await fetchMyEvents(); //refresh
      await fetchEvents();
      alert("registration canceled");
    }catch(error){
      console.error("falied to cancel",error);
      alert("try again later");
    }
  };

//delte event
const deleteEvent=async (id)=>{
  try{
    await api.delete(`/events/${id}`);
    setEvents(events.filter((ev)=> ev.id!==id));
    await fetchMyEvents();
  }catch(error){
    console.error("failed to delete even: ",error);
    alert("try again later");
  }
};

//get parat for events Ad page
// const getParticipants= async (eventId)=>{
//   try{
//     const res= await axios.get(`${registrationUrl}/event/${eventId}`);
//     return res.data; //list of regi
//   }catch (error){
//     console.error("falied to load part: ",error);
//     return [];
//   }
// };


const getParticipants = async (eventId) => {
  try {

    const res = await api.get(`/registrations/event/${eventId}`);
    return res.data; // list of registrations
  } catch (error) {
    console.error("Failed to load participants: ", error);
    return [];
  }
};



const removeParticipant = async (userId, eventId) => {
  try {
    await api.delete(`/registrations/${userId}/${eventId}`);
    await fetchMyEvents();
    alert("Participant removed successfully");
  } catch (error) {
    alert("Failed to remove participant: " + error.message);
  }
};


const updateEvents = async (id, eventData) => {
  try {
    const res = await api.put(`/events/${id}`, eventData);
    setEvents(events.map((ev) => (ev.id === id ? res.data : ev)));
    await fetchMyEvents();
  } catch (error) {
    console.error("failed to update event:", error);
  }
};

return(
  <EventsContext.Provider
  value={{
    events,
    myEvents,
    fetchEvents,
    fetchMyEvents,
    registerEvent,
    cancelEvent,
    deleteEvent,
    getParticipants,
    removeParticipant,
    AddEvents,
    setEvents,
    updateEvents,
  }}
  >
    {children}
  </EventsContext.Provider>
  );
};
export default EventsContext;
