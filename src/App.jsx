import { useState, useEffect } from 'react';
import Modal from './components/Modal/Modal.jsx';
import BemacoLogo from './assets/BemacoLogo.png';
import './App.css';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./components/SortableList/SortableList.jsx";

export default function App() {
  const [names, setNames] = useState([
    'pieter',
    'aaron',
    'racel',
    'emir',
    'rehan',
  ]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [showModal, setShowModal] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleAddPlayer() {
    setNames([...names, name]);
    setName('')
  }

  const [text, setText] = useState('Input Username');

  // function handleRemovePlayer() {
  //   const newNames = [...names]; // Create a shallow copy of the names array
  //   newNames.splice(0, 2); // Remove the first two items
  //   setNames(newNames);
  // }
  
  useEffect(() => {
    if(username) {
      setText(`Change Username`);
    }
    else{
      setText(`Input Username`);
    }
  }, [username]);

  return (
    <div className='bg-creamy flex justify-center'>
      <div className='flex flex-col min-h-screen max-w-sm'>
        <Modal
          setUsername={setUsername}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <header className='flex flex-col item-center mb-5 justify-center'>
            <div className='flex justify-center'>
              <img src={BemacoLogo} className='object-cover justify-bottom'></img>
            </div>
            <div className='flex'>Antrian Maimai Hari ini</div>
            <div className='flex'>Day, DD/MM/YYYY</div>
        </header>
        <div className='min-h-50vh mb-5 flex flex-col justify-center'>
          <div className='mb-5 flex flex-col items-center'>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={names} strategy={verticalListSortingStrategy}>
                {names.map((name,index ) => (
                  <SortableItem key={name} name={name} idx={index} itemSize={names.length} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
          <div className='join flex justify-center mb-5'>
            <input className='input input-bordered join-item' value={name} onChange={(e) => setName(e.target.value)} ></input>
            <button
              type='button'
              className='btn btn-secondary join-item'
              onClick={handleAddPlayer}
            >
              Queue
            </button>
          </div>
          <div className='flex justify-center'>
            <button className='btn w-52' onClick={()=>setShowModal(true)}>{text}</button>
          </div>
        </div>
        <footer className='bg-maimai-background bg-center bg-cover bg-no-repeat bottom-0 w-full h-[31.25rem]'>
        </footer>
      </div>
    </div>

  );
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setNames((names) => {
        const oldIndex = names.indexOf(active.id);
        const newIndex = names.indexOf(over.id);

        return arrayMove(names, oldIndex, newIndex);
      });
    }
  }
}
