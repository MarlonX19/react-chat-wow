import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import axios from 'axios';

import { useAuth } from '../contexts/AuthContext';

function Chats() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const handleLogout = async () => {
    await auth.signOut();
    history.push('/')
  }

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], 'avatar.jpg', { type: 'image/jpeg' })
  }

  useEffect(() => {
    if (!user) {
      history.push('/');
      return;
    }

    axios.get('https://api.chatengine.io/users/me/', {
      headers: {
        'project-id': process.env.REACT_APP_CHAT_ENGINE_ID,
        'user-name': user.email,
        'user-secret': user.uid
      }
    }).then(() => {
      setLoading(false)
    }).catch(() => {
      let formdata = new FormData();
      formdata.append('email', user.email)
      formdata.append('username', user.email)
      formdata.append('secret', user.uid)

      getFile(user.photoURL).then((avatar) => {
        console.log('===avatar goes here', avatar)
        formdata.append('avatar', avatar, avatar.name)
        axios.post('https://api.chatengine.io/users', formdata, {
          headers: {
            'private-key': process.env.REACT_APP_CHAT_ENGINE_KEY
          }
        }).then(() => {
          setLoading(false)
        }).catch((error) => console.log('error creating new user', error))
      })
    })

  }, [user])


  if (!user || loading) return 'LOADING...!'


  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>
          Chat Wow
        </div>
        <div onClick={handleLogout} className='logout-tab'>
          Log out
        </div>
      </div>
      <ChatEngine
        height='cal(100vh - 66px)'
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  )
}

export default Chats;