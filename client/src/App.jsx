import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './Pages/SignIn'


function App() {
  const [count, setCount] = useState(0)

  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/sign-in' element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>

  </>    
  )
}

export default App
