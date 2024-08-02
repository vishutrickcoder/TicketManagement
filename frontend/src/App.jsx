import { Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home/Home';
import UserDashboard from './components/UserDeshboard/UserDashboard';
import AdminDashboard from './components/AdminDeshboard/Admin';
function App() {
  


  return (
    <>
      
       <div className="app">
        
       <Routes>
       <Route path='/' element={<Login/>} />
       <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
       </div>
    </>
  )
}

export default App
