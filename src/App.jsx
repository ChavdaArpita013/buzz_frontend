import './App.css'
import Navbar from './common/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup'
import Login from './pages/Login'
import Buzzing from './pages/Buzzing';
import ViewAllBuzz from './pages/ViewAllBuzz';
import TopHashTags from './pages/TopHashTags';
import BuzzOfTheDay from './pages/BuzzOfTheDay';
import ViewBuzzOfUser from './pages/ViewBuzzOfUser';
import ViewUpdateProfile from './pages/ViewUpdateProfile';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/buzzing' element={<Buzzing />} />
          <Route path='/view/profile' element={<ViewUpdateProfile />} />
          <Route path='/all-buzz' element={<ViewAllBuzz />} />
          <Route path='/user/buzz' element={<ViewBuzzOfUser />} />
          <Route path='/top' element={<TopHashTags />} />
          <Route path='/buzz-of-the-day' element={<BuzzOfTheDay />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
