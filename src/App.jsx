import { useState, useEffect, useLayoutEffect } from "react";
import Modal from "./components/Modal/Modal";
import Cookies from "js-cookie";
import BemacoLogo from './assets/BemacoLogo.png'
import "./App.css";

export default function App() {
  const [names, setNames] = useState([
    "pieter",
    "aaron",
    "racel",
    "emir",
    "rehan",
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [name, setName] = useState('');

  function handleAddPlayer() {
    setNames([...names, name]);
    setName('')
  }
  
  function handleAddPlayers() {
    setIsModalOpen(!isModalOpen);
  }


  // function handleRemovePlayer() {
  //   const newNames = [...names]; // Create a shallow copy of the names array
  //   newNames.splice(0, 2); // Remove the first two items
  //   setNames(newNames);
  // }


  const [actionPerformed, setActionPerformed] = useState(false);

  useEffect(() => {
    // Check if the device has already performed the action
    if(localStorage.getItem("username")==''){
      document.getElementById('my_modal_2').showModal()
    }
    const deviceAction = Cookies.get("deviceAction");
    if (deviceAction === "true") {
      setActionPerformed(true);
    }
  }, []);

  useLayoutEffect(() => { document.body.classList = 'bg-creamy' }, [])

  return (
    <div className="flex flex-col items-center justiy-center min-h-screen max-w-sm mx-auto flex-1">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onQueue={handleAddPlayer}
      />
      <header className="flex flex-col item-center mb-5 justify-center">
          <div className="flex justify-center">
            <img src={BemacoLogo} className='object-cover justify-bottom'></img>
          </div>
          <div className="flex">Antrian Maimai Hari ini</div>
          <div className="flex">Day, DD/MM/YYYY</div>
      </header>
      <div className="min-h-50vh mb-5 flex flex-col justify-center">
        <div className="mb-5 flex flex-col items-center">
          {names.length === 0 ? (
            <span>There are no names</span>
          ) : (
            names.map((name, index) => (
              <div
                key={index}
                className="name-item p-4 bg-amber-100 border-solid border-b-2 min-w-80 border-gray-800 w-1/2"
              >
                <span className="flex justify-center">{name}</span>
              </div>
            ))
          )}
        </div>
        <div className="join flex justify-center">
          <input className="input input-bordered join-item" value={name} onChange={(e) => setName(e.target.value)} ></input>
          <button
            type="button"
            className="btn btn-secondary join-item"
            onClick={handleAddPlayer}
          >
            Queue
          </button>
        </div>
        <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>{localStorage.getItem("username") == '' ?  'Insert your username' : 'Change your username '}</button>
      </div>
      <footer className="bg-maimai-background bg-center bg-cover bg-no-repeat bottom-0 w-full h-[31.25rem]">
          
      </footer>
    </div>
  );
}
