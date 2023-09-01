import React, { useEffect, useState } from 'react'
import '../CSS/SideBarChat.css'
import { Avatar } from '@mui/material'
import { db } from '../firebase';
import { doc, collection, query, orderBy, onSnapshot, addDoc, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom';


const SideBarChat = ({id , name , addNewChat}) => {
    const [seed, setseed] = useState('')
    const [messages, setmessages] = useState([])
    const [lastMessage, setLastMessage] = useState('');


    useEffect(() => {
      if (id) {
        const roomRef = doc(collection(db, 'rooms'), id);
        const messagesRef = collection(roomRef, 'messages');
        
        const unsubscribe = onSnapshot(
          query(messagesRef, orderBy('timestamp', 'desc')), 
          (snapshot) => {
            const messagesData = snapshot.docs.map((doc) => doc.data().message);
            setmessages(messagesData);
          }
        );
        const lastMessageRef = onSnapshot(
          query(messagesRef, orderBy('timestamp', 'desc'), limit(1)), 
          (snapshot) => {
            const latestMessage = snapshot.docs[0]?.data().message || '';
            setLastMessage(latestMessage);
          }
        );
        
        return () => {
          unsubscribe();
          lastMessageRef();
        };
      }
    }, [id]);
    

    useEffect(() => {
      Math.floor(
        setseed(Math.random() * 500)
      )}, [])

    const createChat = () => {
        const roomName = prompt('Please enter the name of the room');
        if (roomName) {
          const roomsRef = collection(db, 'rooms');
            addDoc(roomsRef, {
            name: roomName
          });
          
        }
    };
  return !addNewChat ? (
    <Link  to={`rooms/${id}`}>
    <div className='sidebarChat'>
        <Avatar src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`}/>
        <div className='sidebarChat_info'>
            <h2>{name}</h2>
            <p>{lastMessage}</p>
        </div>
    </div>
    </Link>
  ) :(
    <div onClick={createChat} className='sidebarChat addNewChat'>
        <h2>Add New Chat</h2>
    </div>
  )
};

export default SideBarChat