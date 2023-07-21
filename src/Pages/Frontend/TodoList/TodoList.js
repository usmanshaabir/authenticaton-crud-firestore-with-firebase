import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore/lite";
import { firebase } from '../../../config/firebase';

export default function TodoList() {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState({ name: '', age: '', country: '' });

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value })
  }

  const getData = async () => {
    try {
      const dataArray = [];
      const querySnapshot = await getDocs(collection(firebase, "users"));
      querySnapshot.forEach((doc) => {
        const actData = doc.data();
        actData.id = doc.id
        dataArray.push(actData);
      });
      setState(dataArray);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false); // Set loading to false even in case of error
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (user) => {
    console.log(user);
    await deleteDoc(doc(firebase, "users", user.id));
    try {
      console.log("successfully Delete");
    } catch (e) {
      console.error(e);

    }

    const delteData = state.filter((doc) => {
      return doc.id !== user.id
    })
    setState(delteData)
  }

  const handleEdit = (user) => {
    setTodo(user)
  }
  const handleUpdate = async (user) => {
    await setDoc(doc(firebase, "users", user.id), user, { merge: true });
    console.log('Updated successfully');
    let updatedTodo = state.map((oldTodo) => {
      if (oldTodo.id === state.id)
        return state
      return oldTodo
    })
    setState(updatedTodo)
    console.log("updated", updatedTodo);
    setTodo({ name: '', age: '', country: '' })
  }
  return (
    <div className="container">
      <div className="row">
        <div className=" mt-5">
          <div className="table-responsive">
            <table className="table table-bordered ">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Full Name</th>
                  <th>Age</th>
                  <th>Country</th>
                  <th className='text-center'>Delete</th>
                  <th className='text-center'>Update</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {state.map((user, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.country}</td>
                        <td className='text-center'><button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { handleEdit(user) }}>update</button></td>
                        <td className='text-center'><button className="btn btn-danger" onClick={() => { handleDelete(user) }}>delete</button></td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">full Name</label>
                    <input
                      type="name"
                      value={todo.name} // Use todo state value for name input
                      className="form-control"
                      onChange={handleChange}
                      name="name" // Add name attribute for the handleChange function
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                      type="age"
                      value={todo.age} // Use todo state value for age input
                      className="form-control"
                      onChange={handleChange}
                      name="age" // Add name attribute for the handleChange function
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">country</label>
                    <input
                      type="country"
                      value={todo.country} // Use todo state value for country input
                      className="form-control"
                      onChange={handleChange}
                      name="country" // Add name attribute for the handleChange function
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={() => { handleUpdate(todo) }}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
