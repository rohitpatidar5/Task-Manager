import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Tasks from './Pages/Tasks'
import Privateroute from './Components/Privateroute'


function App() {
  const [count, setCount] = useState(0)

  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        



        <Route path='/private' element={<Privateroute />}>
             <Route path='tasks' element={<Tasks/>}/>
        </Route>

        
      </Routes>
    </BrowserRouter>

  </>    
  )
}

export default App
