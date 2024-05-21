import { useRef, useState } from "react";

/* eslint-disable react/prop-types */
const Modal = ({setUsername, showModal, setShowModal }) => {
  const [inputName, setInputName] = useState("")
  
  const handleUsernameSubmit = async () => {
    if (localStorage.getItem("username") === null) {
      localStorage.setItem("username", inputName);
      localStorage.setItem("id",1716310450447)
      setUsername(inputName)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 1716310450447 , name: inputName })
      };
      await fetch('http://localhost:3000/users/store', requestOptions ).then((response) => {
        response.json().then((data) => {
          console.log("the data is", data);
        });
      });
      setShowModal(false)
    }
    else{
      const id = localStorage.getItem("id")
      localStorage.setItem("username", inputName);
      setUsername(inputName)

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: inputName })
      };
      await fetch(`http://localhost:3000/users/update/${id}`, requestOptions )
      .then(response => response.json());
      setShowModal(false)
    }
  };

  const inputElement = useRef()
  if(!showModal) return null

  return (
    <dialog id="my_modal_2" className="modal modal-open">
    <div className="modal-box w-auto">
      <p className="mb-3">{localStorage.getItem("username") === null ?  'Please enter username' : 'Please enter new username'}</p>
      <form method="dialog" className="join">
        <input className="input input-bordered join-item" value={inputName} ref={inputElement} onChange={(e) => setInputName(e.target.value)}  ></input>
        <button
          className="btn btn-secondary join-item"
          onClick={handleUsernameSubmit}
        >
          Add
        </button>
      </form>
    </div>
    <form method="dialog" className="modal-backdrop">
      <button onClick={() => setShowModal(false)}>close</button>
    </form>
  </dialog>
  );
};

export default Modal;