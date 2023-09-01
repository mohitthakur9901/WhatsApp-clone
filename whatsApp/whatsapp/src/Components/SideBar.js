import React, { useEffect, useState } from 'react'
import {db} from '../firebase.js';
import { collection, onSnapshot } from 'firebase/firestore';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import  {Avatar, IconButton } from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import SideBarChat from '../Components/SideBarChat';
import { useStateValue } from './StateProvider.js';



function SideBar() {
  const [room, setroom] = useState([])
  const [{user} , dispatch] = useStateValue();


  useEffect(() => {
    const roomsRef = collection(db, 'rooms'); 
    const unsubscribe = onSnapshot(roomsRef, snapshot => { 
      setroom(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
      console.log(db)
    });
    return () => {
      unsubscribe(); 
    };
  }, []); 
  
  return (
    <div className='sidebar'>
        <div className='sidebar_header'>
        <Avatar src={user?.photoURL} />
        <div className='sidebar_headerRight'>
          <IconButton>
            <DonutLargeIcon/>
          </IconButton>
          <IconButton>
            <ChatIcon/>
          </IconButton>
          <IconButton>
            <MoreVertIcon/>
          </IconButton>

        </div>
        </div>
        <div className='sidebar_search'>
          <div className='sidebar_searchContainer'>
          <SearchOutlined/>
            <input placeholder='Search or start new chat' type='text'/>
          </div>  
        </div>
        <div className='sidebar_chat'>
          <SideBarChat addNewChat />
          {room.map(room => (
            <SideBarChat key={room.id} id={room.id} name={room.data.name} />
          ))}
        </div>
    </div>
  )
}

export default SideBar