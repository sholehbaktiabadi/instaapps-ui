import { BrowserRouter as R, Routes, Route } from 'react-router-dom' 
import { Layout } from "./layout/layout"
import { Home } from "./page/home"
import Register from './page/register'
import Login from './page/login'
import AuthWrapper from './middleware/authorization'

function App() {

  return (
    <R>
      <Routes>
         <Route path='/' element={<AuthWrapper><Layout><Home /></Layout></AuthWrapper>} />
         <Route path='/register' element={<Register />} />
         <Route path='/login' element={<Login />} />
      </Routes>
    </R>
  )
}

export default App
