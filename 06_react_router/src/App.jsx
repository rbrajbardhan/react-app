import {Route,Routes} from 'react-router-dom'
import Layout from '../components/Layout'
import Users from '../pages/Users'
import UserDetails from '../pages/UserDetails'
function App() {

  return (
   <Routes>
    <Route path='/' element={<Layout/>}> 
      <Route path='users' element={<Users/>}/>
      <Route path='users/:id' element={<UserDetails/>}/>
    </Route>
   </Routes>
  )
}

export default App
