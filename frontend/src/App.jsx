import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import SignUp from './pages/signup/SignUp'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/authContext.jsx'

function App() {

  const { authUser } = useAuthContext();

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
     <Routes>
      <Route path='/' element={authUser ? <Home /> : <Login />}/>
      <Route path='/login' element={authUser ? <Home /> : <Login/>}/>
      <Route path='/signup' element={authUser ? <Home /> : <SignUp />}/>
     </Routes>
     <Toaster />
    </div>
  )
}

export default App