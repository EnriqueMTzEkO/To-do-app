import Register from './routes/Register';
import Login from './routes/Login';
import Layout from './Layout' 
import Home from './routes/Home';
import Missing from './routes/Missing';
import Unauthorized from './routes/Unauthorized';
import Settings from './routes/Settings';
import Notes from './routes/Notes';
import RequireAuth from './RequireAuth';
import PersistLogin from './Components/PersistLogin';
import { Routes, Route} from 'react-router-dom';
import NewNote from './routes/NewNote';


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
            <Route path="/notes" element={<Home />} />
          </Route>

          <Route element={<RequireAuth/>}>
            <Route path="/notes/:noteId" element={<Notes />} />
          </Route>

          <Route element={<RequireAuth/>}>
            <Route path="/notes/nueva_nota" element={<NewNote />} />
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
