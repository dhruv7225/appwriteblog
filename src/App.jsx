import { useState ,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import {Header,Footer} from './components/index'
import {Outlet} from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)
  const [loading,setLoading]= useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout()) 
      }
    })
    .finally(()=>setLoading(false))
  },[])
  return !loading? (
    <>
    {/* <h1 className='bg-gray-400'>hello</h1> */}
     <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
     </div>
    </>
  ):(
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

export default App
