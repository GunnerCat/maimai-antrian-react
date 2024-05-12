import { useState, useEffect } from 'react';
import Modal from './components/Modal/Modal';
import Cookies from 'js-cookie';
import './App.css';
import { DndContext } from '@dnd-kit/core';
import Footer from './components/Footer/Footer';
import Body from './components/Body/Body';
import Header from './components/Header/Header';

export default function App() {
  const [names, setNames] = useState(['pieter', 'aaron', 'racel', 'emir', 'rehan']);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleQueueClick() {
    setIsModalOpen(!isModalOpen);
  }

  function handleRemoveCurPlayer() {
    const newNames = [...names]; // Create a shallow copy of the names array
    newNames.splice(0, 2); // Remove the first two items
    setNames(newNames);
  }

  function handleQueue(newName) {
    setNames([...names, newName]);
    setIsModalOpen(false);
  }

  const [actionPerformed, setActionPerformed] = useState(false);

  useEffect(() => {
    // Check if the device has already performed the action
    const deviceAction = Cookies.get('deviceAction');
    if (deviceAction === 'true') {
      setActionPerformed(true);
    }
  }, []);

  function performAction() {
    // Perform the action if it hasn't been performed already
    if (!actionPerformed) {
      // Perform the action here
      // Set a cookie to track that the action has been performed by this device
      Cookies.set('deviceAction', 'true', { expires: 1 }); // Expires in 1 day
      // Update state to reflect that the action has been performed
      setActionPerformed(true);
    } else {
      alert('Action already performed by this device.');
    }
  }

  return (
    <div className="flex flex-col items-center justiy-center min-h-screen flex-1">
      {/* Render the Modal component here */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onQueue={handleQueue}
      />
      <Header />
      <Body onQueueFromBody={handleQueueClick} names={names}/>
      <Footer />
    </div>
  );
}