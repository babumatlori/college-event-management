import React, { useState, useContext, useEffect } from "react";
import "./AdminPage.css";
import EventsContext from "./EventsContextPage";
import AuthContext from "./AuthContextPage";
// import useAuthGuard from "./useAuthGuard";

const AdminPage = () => {
  // 🔐 Guard admin access
  // const auth = useAuthGuard("ADMIN");

  const { events, deleteEvent, getParticipants, removeParticipant, AddEvents, updateEvents } =
    useContext(EventsContext);

  const { loading, currentUser } = useContext(AuthContext);

  // 📊 Analytics
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [uniqueUsers, setUniqueUsers] = useState(0);

  // 📝 Event form
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    place: "",
  });

  const [editId, setEditId] = useState(null);
  const [eventParticipants, setEventParticipants] = useState({});

  // -----------------------------
  // 📊 CALCULATE ANALYTICS
  // -----------------------------
  useEffect(() => {
    if (loading) return;
    if (!currentUser || currentUser.role !== "ADMIN") return;
    if (!events || events.length === 0) {
      setTotalParticipants(0);
      setUniqueUsers(0);
      return;
    }

    const calculateStats = async () => {
      let participantCount = 0;
      const userSet = new Set();

      for (const event of events) {
        const participants = await getParticipants(event.id);

        participantCount += participants.length;
        participants.forEach((reg) => userSet.add(reg.user.id));

        setEventParticipants((prev) => ({
          ...prev,
          [event.id]: participants,
        }));
      }

      setTotalParticipants(participantCount);
      setUniqueUsers(userSet.size);
    };

    calculateStats();
  }, [events, loading, currentUser,getParticipants]);

  // -----------------------------
  // 📝 FORM HANDLERS
  // -----------------------------
  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleEvent = (e) => {
    e.preventDefault();

    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.place) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      updateEvents(editId, newEvent);
      setEditId(null);
    } else {
      AddEvents(newEvent);
    }

    setNewEvent({ title: "", description: "", date: "", place: "" });
  };

  const editEvent = (id) => {
    const ev = events.find((e) => e.id === id);
    if (!ev) return;

    setNewEvent({
      title: ev.title,
      description: ev.description,
      date: ev.date,
      place: ev.place,
    });
    setEditId(ev.id);
  };

  // -----------------------------
  // 📥 CSV DOWNLOADS
  // -----------------------------
  const downloadFile = (event) => {
    const participants = eventParticipants[event.id] || [];
    if (participants.length === 0) return alert("No participants");

    let csv = "data:text/csv;charset=utf-8,Name\n";
    participants.forEach((r) => (csv += r.user.name + "\n"));

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `${event.title}_participants.csv`;
    link.click();
  };

  const downloadAll = () => {
    let csv = "data:text/csv;charset=utf-8,Event,Participant\n";
    let hasData = false;

    events.forEach((event) => {
      const participants = eventParticipants[event.id] || [];
      if (participants.length > 0) {
        hasData = true;
        participants.forEach((r) => {
          csv += `${event.title},${r.user.name}\n`;
        });
      }
    });

    if (!hasData) return alert("No data");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "All_Events_Participants.csv";
    link.click();
  };

  // -----------------------------
  // 🖥️ UI
  // -----------------------------
  return (
    <div className="admin-cont">
      <h1>Admin Dashboard</h1>

      {/* 📊 STATS */}
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Events</h3>
          <p>{events.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Participants</h3>
          <p>{totalParticipants}</p>
        </div>
        <div className="stat-card">
          <h3>Registered Users</h3>
          <p>{uniqueUsers}</p>
        </div>
      </div>

      {/* ➕ ADD / EDIT */}
      <div className="addEvent-form">
        <h2>{editId ? "Edit Event" : "Add New Event"}</h2>
        <form onSubmit={handleEvent}>
          <input name="title" value={newEvent.title} onChange={handleChange} placeholder="Title" />
          <textarea name="description" value={newEvent.description} onChange={handleChange} />
          <input type="date" name="date" value={newEvent.date} onChange={handleChange} />
          <input name="place" value={newEvent.place} onChange={handleChange} />
          <button>{editId ? "Update" : "Add"}</button>
        </form>
      </div>

      {/* EVENTS */}
      <div className="admin-grid">
        {events.map((event) => (
          <div key={event.id} className="admin-card">
            <h3>{event.title}</h3>
            <h3></h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Place:</strong> {event.place}</p>
            <button className="delete" onClick={() => deleteEvent(event.id)}>Delete</button>
            <button className="edite" onClick={() => editEvent(event.id)}>Edit</button>
            <button className="edite" onClick={() => downloadFile(event)}>CSV</button>

            <ul>
              {(eventParticipants[event.id] || []).map((r, i) => (
                <li key={i}>
                  {r.user.name}
                  <button onClick={() => removeParticipant(r.user.id, event.id)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button onClick={downloadAll}>Download All CSV</button>
    </div>
  );
};

export default AdminPage;
