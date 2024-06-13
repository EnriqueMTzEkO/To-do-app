import { Routes, Route} from 'react-router-dom';
import RequireAuth from './RequireAuth';
import Register from './Register';
import Login from './Login';
import Layout from './Layout';
import Home from './Home';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />

      {/* Rutas protegidas*/}
      <Route element={<RequireAuth />}>
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
