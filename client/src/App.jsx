import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'
import BookingHistory from './BookingHistory'


function App() {

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/booking-history' element={<BookingHistory />}></Route>


      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
