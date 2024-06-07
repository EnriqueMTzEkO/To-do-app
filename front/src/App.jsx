import Register from './Register';
import Login from './Login';
import { Routes, Routes} from 'react-router-dom';
import Layout from './Layout';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  )
}

export default App
