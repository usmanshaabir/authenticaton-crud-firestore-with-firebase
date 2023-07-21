import { useState } from 'react';
import React from 'react';
import { setDoc, doc } from "firebase/firestore/lite";
import { firebase } from "../../../config/firebase";



const initState = { name: '', age: '', country: '' }

export default function AddUsers() {

  const [state, setState] = useState(initState)

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(state);

    const { name, age, country } = state

    const ramdomId = Math.random().toString(36).slice(2)
    console.log("testing", ramdomId);
    try {
       await setDoc(doc(firebase, "users", ramdomId), { name, age, country, id: ramdomId });
      console.log("Document written with ID: ", ramdomId);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      <main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="name" name='name' className="form-control" onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input type="age" name='age' className="form-control" onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Country</label>
                    <input type="country" name='country' className="form-control" onChange={handleChange} />
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add User</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

