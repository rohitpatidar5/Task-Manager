import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Tasks from './Pages/Tasks'


function App() {
  const [count, setCount] = useState(0)

  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/tasks' element={<Tasks/>}/>
        
      </Routes>
    </BrowserRouter>

  </>    
  )
}

export default App
