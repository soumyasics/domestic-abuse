import './App.css';
import Footer from './Pages/Common/Footer/Footer';
import Home from './Pages/Common/Home/Home';
import Navbar from './Pages/Common/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import User_Login from './Pages/Common/User/login/User_Login';
import User_Register from './Pages/Common/User/register/User_Register';

function App() {
  return (
    <div className="container-fluid">
      
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/user-login' element={<User_Login />} />
        <Route path='/user-register' element={<User_Register />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    
    </div>
  );
}

export default App;
