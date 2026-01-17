import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './pages/ThemeContextPage.jsx'
import { AuthProvider } from './pages/AuthContextPage.jsx'
import { EventsProvider } from './pages/EventsContextPage.jsx'

createRoot(document.getElementById('root')).render(

    <ThemeProvider>
      <AuthProvider>
        <EventsProvider>
          <App/>
        </EventsProvider>
      </AuthProvider>
    </ThemeProvider>
  // </StrictMode>,
)
