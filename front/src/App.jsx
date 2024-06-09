import Register from './Register';
import Login from './Login';
import { Routes, Route} from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<Home />} />
    </Routes>
  )
}

export default App
