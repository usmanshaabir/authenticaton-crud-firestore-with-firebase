import { useEffect, useState } from 'react';
import React from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile ,sendEmailVerification} from "firebase/auth";
import { auth } from '../../config/firebase'

const initState = { email: '', password: '' }

export default function Login() {
  // Hooks
  const [state, setState] = useState(initState)
  const [user, setUser] = useState({});
  // HandleChange
  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }))
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(user)
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  })

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(state);

    const { email, password } = state

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('successfully Logout');
        setUser({})

      })
      .catch((err) => {
        console.error(err);
      })

  }
  const updatedUserName = () => {
    const userAuth = auth.currentUser
    updateProfile(userAuth, {
      photoURL:'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
    })
      .then(() => {
        console.log('updated successfully');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const currentInfo = () => {
    console.log('Check status', auth.currentUser);
  }
  const sendEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email verification sent!');
      });
  }

  // HTML
  return (
    <>
      <main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div>
                {
                  user.email ? <>
                  <img src={user.photoURL} alt={user.email} />
                    <h5 className='text-center mb-3 text-white'>User Email:{user.email}</h5>
                    <h5 className='text-center mb-3 text-white'>uid:{user.uid}</h5>
                    <h5 className='text-center mb-3 text-white'>photoURL:{user.photoURL}</h5>
                    <div className='text-center mt-2'>
                      <button className="btn btn-lg btn-danger my-2" onClick={handleLogout}>Logout</button><br />
                      <button className="btn btn-lg btn-success my-2" onClick={updatedUserName}>Updated User Name</button> <br />
                      <button className="btn btn-lg btn-info my-2" onClick={currentInfo}>currentInfo</button> <br />
                      <button className="btn btn-lg btn-info my-2" onClick={sendEmail}>sendEmailVerification</button>
                    </div>
                  </> :
                    <form>
                      <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" name='email' className="form-control" onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" name='password' className="form-control" onChange={handleChange} />
                      </div>
                      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Login</button>
                    </form>
                }

              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

