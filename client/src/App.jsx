import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'

function App() {

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
