import './App.css';
import SideBar  from './Components/SideBar';
import Chat from './Components/Chat';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import { useStateValue } from './Components/StateProvider';

function App() {
  const [{user} , dispatch] = useStateValue();


  return (
    <div className="App">
      {!user ?(
        <Login/>
      ):(
        <div className='app__body'>
        <Router>
          <SideBar />
          <Routes>
            <Route path="rooms/:roomId" element={<Chat />} />
          </Routes>
        </Router>
      </div>
      )}
      
    </div>
  );
}

export default App;
