import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/signForms/SignIn';
import SignUp from './pages/signForms/SignUp';
import Home from './pages/home/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
