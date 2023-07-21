import { useState } from 'react';
import React from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firebase } from '../../config/firebase'
import { doc, setDoc } from 'firebase/firestore/lite';

const initState = { email: '', password: '' }

export default function Register() {
    // Hooks
    const [state, setState] = useState(initState);
    // HandleChange
    const handleChange = (e) => {
        setState((s) => ({ ...s, [e.target.name]: e.target.value }))
    }
    // handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(state);

        const { email, password } = state

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('successfully added');
                console.log("dffdf",user.uid);
                try {
                    setDoc(doc(firebase, "users", user.uid), { fullName: "", uid: user.uid })
                }
                catch (e) {
                    console.error('again',e)
                }
            })
            .catch((error) => {
                console.log(error);
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
                                <div className='text-center'>
                                    <h1 className='text-white'>Sign Up</h1>
                                </div>
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Email address</label>
                                        <input type="email" name='email' className="form-control" onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input type="password" name='password' className="form-control" onChange={handleChange} />
                                    </div>
                                    <div className='text-center'>
                                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Singup</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
