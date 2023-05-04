import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import CalendarEvents from './pages/Calendar';
import AddEvent from './components/AddEvent';
import Inventory from './pages/Inventory';
import AddInstrument from './components/AddInstrument';
import Students from './pages/Students';
import AddStudent from './components/AddStudent';


function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/calendar' element={<CalendarEvents />} />
            <Route path='/addEvent' element={<AddEvent />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route path='/addInstrument' element={<AddInstrument />} />
            <Route path='/students' element={<Students />} />
            <Route path='/addStudent' element={<AddStudent />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;