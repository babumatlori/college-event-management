import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventsPages from './pages/EventsPage';
import MyEventsPage from './pages/MyEventsPage';
import AdminPage from './pages/AdminPage';
import Navbar from './components/Navbar';
import { EventsProvider } from './pages/EventsContextPage';
import AuthContext, { AuthProvider } from './pages/AuthContextPage';
import { ThemeProvider } from './pages/ThemeContextPage';
import AdminRoute from './AdminRoute';
import { useContext } from 'react';

const App = () => {
  // const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const {currentUser, loading } = useContext(AuthContext);

  if(loading) return <h1>loading...</h1>
  return (


        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/events"
            element={
              currentUser ? <EventsPages/> : <Navigate to="/login" replace/>
            } />

            {/* route for My Events */}
            <Route
            element={<MyEventsPage/>}
            >
              <Route path='/myevents' element={<MyEventsPage/>}/>
            </Route>

            {/* <Route path='/myevents' element={
              <RequireAuth isAllowed={!!currentUser}>
                <MyEventsPage/>
              </RequireAuth>
            } /> */}

            {/* route for Admin */}
            <Route
            element={<AdminRoute/>} >
            <Route path="/admin"
            element={<AdminPage />} />
            </Route>

          </Routes>
        </Router>
  );
};

export default App;
