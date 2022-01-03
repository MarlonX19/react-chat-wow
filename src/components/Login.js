import React from 'react';
import { GoogleOutlined } from '@ant-design/icons';
import 'firebase/app';

import { auth } from '../firebase';
import firebase from 'firebase/app';


function components() {
  return (
    <div id='login-page'>
      <div id='login-card'>
        <h2>Welcome to Chat Wow</h2>
        <div
          role='button'
          className='login-button google'
          onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
        >
          <GoogleOutlined /> Log in with Google
        </div>
      </div>
    </div>
  )
}

export default components;