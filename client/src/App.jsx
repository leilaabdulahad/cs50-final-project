import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import { useSelector } from "react-redux"
import './tailwind.css'

function App() {
  const isAuth = Boolean(useSelector((state) => state.token))

  return (
  
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
      </BrowserRouter>

  )
}

export default App