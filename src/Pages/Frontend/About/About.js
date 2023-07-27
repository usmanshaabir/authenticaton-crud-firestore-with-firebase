import React, { useState } from 'react';
import { filesize } from 'filesize';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../config/firebase';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function About() {
  const [file, setFile] = useState({});
  const [isUpdateding, setIsUpdateding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState('')

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const notify = (text) => toast(text);

  const handleUpdate = () => {
    if (file) {
      setIsUpdateding(true);
      const randomId = Math.random().toString(36).slice(2);
      const storageRef = ref(storage, `images/${randomId}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.trunc((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Upload error:', error);
          setIsUpdateding(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log('File available at', downloadURL);
              setDownloadUrl(downloadURL); // Update the download URL state
            })
            .catch((error) => {
              console.error('Error getting download URL:', error);
            })
            .finally(() => {
              setIsUpdateding(false);
              notify('successfully Updated');
            });
        }
      );
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="mb-3 mt-5">
            <label className="form-label">Select File</label>
            <input className="form-control" type="file" onChange={handleChange} />
            <p>
              FileName: {file.name} | FileSize: {file.size ? filesize(file.size) : ''}
            </p>
            <div className='d-flex justify-content-center align-items-center flex-column'>
              {(downloadUrl === '') ? '' :
                <>
                  <a href={downloadUrl} className='btn btn-primary' target='_blank'>downloadURL</a>
                  <img src={downloadUrl} className='w-25' alt="not found" />
                </>
              }
            </div>
          </div>{
            isUpdateding ? <>
              <div className="container">
                <div className="row">
                  <div className="progress ps-0 pe-0 mb-3" role="progressbar" aria-label="Example with label" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar" style={{ width: `${progress}%` }}>{progress}%</div>
                  </div>
                </div>
              </div>
            </> :
              " "
          }
          <div className='d-flex justify-content-end'>
            {!isUpdateding ? (
              <button className="btn btn-success" onClick={handleUpdate}>Upload</button>
            ) : (
              <button className="btn btn-success" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />

    </>
  );
}
