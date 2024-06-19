import Register from './Register';
import Login from './Login';
import Layout from './Layout';
import Home from './Home';
import Missing from './Missing';
import Unauthorized from './Unauthorized';
import Settings from './Settings';
import RequireAuth from './RequireAuth';
import PersistLogin from './Components/PersistLogin';
import { Routes, Route} from 'react-router-dom';



function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="unauthorized"  element={<Unauthorized />} />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth/>}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth/>}>
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Catch other rutes */}
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
    
  )
}

export default App
