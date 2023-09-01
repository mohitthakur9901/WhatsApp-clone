import React, { useEffect, useState } from 'react'
import '../CSS/Chat.css'
import { Avatar, IconButton } from '@mui/material'
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import AttachFile from '@mui/icons-material/AttachFile';
import MoreVert from '@mui/icons-material/MoreVert';
import InsertEmoticon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot , doc, addDoc} from 'firebase/firestore';
import { useStateValue } from './StateProvider';
import { serverTimestamp } from 'firebase/firestore';

const Chat = () => {
    const [seed, setseed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setroomName] = useState('')
    const [messages, setMessages] = useState([]);
    const [{user} , dispatch] = useStateValue();


    useEffect(() => {
      if (roomId) {
        const roomRef = doc(collection(db, 'rooms'), roomId);
        const unsubscribe = onSnapshot(roomRef, snapshot => {
          setroomName(snapshot.data().name);
        });
  
        const messagesRef = collection(roomRef, 'messages');
        const messagesUnsubscribe = onSnapshot(messagesRef, snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()));
        });
  
        return () => {
          unsubscribe();
          messagesUnsubscribe();
        };
      }
    }, [roomId]); 
    
    

    useEffect(() => {
      Math.floor(
        setseed(Math.random() * 500)
      )
    
    }, [roomId])


    const sendMessage = (e) => {
      e.preventDefault();
      
      // Ensure input and roomId are defined
      if (input && roomId) {
        const roomRef = doc(collection(db, 'rooms'), roomId);
        const messagesRef = collection(roomRef, 'messages');
        addDoc(messagesRef, {
          message: input,
          name: user.displayName,
          timestamp: serverTimestamp()
        });
        setInput('');
      }
    };
    
  return (
    <div className='chat'>
          <div className='chat_header'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className='chat_headerInfo'>
              <h3>{roomName}</h3>
              <p>Last seen{" "} {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
          </div>
          <div className='chat_headerRight'>
            <IconButton>
            <SearchOutlined/>
            </IconButton>
            <IconButton>
            <AttachFile/>
            </IconButton>
            <IconButton>
            <MoreVert/>
            </IconButton>
          </div>
    </div>

      <div className='chat_body'>
        {messages.map(message => (
          <p className={`chat_message ${message.name === user.displayName && "chat_receiver"}`}>
          <span className='chat_name'>{message.name } </span>
            {message.message}
            <span className='chat_time'> {new Date(message.timestamp?.toDate()).toUTCString()}</span>
          </p>
        ))};
        
      </div>
      <div className='chat_footer'>
      <IconButton>
            <InsertEmoticon/>
          </IconButton>
        <form className='chat_inputForm'>
          
          <input placeholder='Type a message' type='text' value={input} onChange={e => setInput(e.target.value)}/>
          <button type='submit' onClick={sendMessage} >Send</button>
        </form>
        {/* <IconButton>
            <AttachFile/>
          </IconButton> */}
          <IconButton>
            <MicIcon/>
          </IconButton>
      </div>

      </div>
  )
}

export default Chat