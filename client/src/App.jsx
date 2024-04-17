import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'
import BookDesk from './BookDesk'

function App() {

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/book-desk' element={<BookDesk />} />

      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
