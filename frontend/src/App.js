import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Create from './pages/Create'
import Browse from './pages/Browse'
import Offer from './pages/Offer'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route
              index
              element={<Home />}
            />
            <Route
              path="/browse"
              element={<Browse />}
            />
            <Route
              path="/offer/:id"
              element={<Offer />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/profile" />}
            />
            <Route
              path="/register"
              element={!user ? <Signup /> : <Navigate to="/profile" />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/create"
              element={user ? <Create action="create" /> : <Navigate to="/login" />}
            />
            <Route
              path="/edit/:id"
              element={user ? <Create action="edit" /> : <Navigate to="/login" />}
            />
            <Route
              path="/delete/:id"
              element={user ? <Profile action="delete" /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;

