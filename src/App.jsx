import { useState, useEffect } from "react";
import Modal from "./components/Modal/Modal.jsx";
import BemacoLogo from "./assets/BemacoLogo.png";
import "./App.css";

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
  //local player testing / datas
  const [players, setPlayers] = useState([
    {
      id: "1",
      name: "Pieter",
    },
    {
      id: "2",
      name: "Aaron",
    },
    {
      id: "3",
      name: "Racel",
    },
    {
      id: "4",
      name: "Emir",
    },
    {
      id: "5",
      name: "Rehan",
    },
    {
      id: "6",
      name: "Emir",
    },
  ]);
  const [username, setUsername] = useState(localStorage.getItem("username"));

  //modal
  const [showModal, setShowModal] = useState(false);

  //dnd
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // const handleAddPlayer=()=> {
  //   const newPlayer ={
  //     id:Date.now().toString(),
  //     name:name
  //   }
  //   setPlayers(players =>[...players, newPlayer])
  //   setName(null)
  // }

  // function handleRemovePlayer() {
  //   const newPlayers = [...players]; // Create a shallow copy of the players array
  //   newPlayers.splice(0, 1); // Remove the first two items
  //   setPlayers(newPlayers);
  // }

  //form and validation
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    const formFields = { ...fields };
    const formErrors = {};
    let formIsValid = true;
    if (!formFields["name"]) {
      formIsValid = false;
      formErrors["name"] = "Name cannot be empty";
    }
    if (formFields["name"].length > 30) {
      formIsValid = false;
      formErrors["name"] = "Name cannot be more than 30 characters";
    }
    setErrors(formErrors);
    return formIsValid;
  };

  const handleChange = (field, value) => {
    setFields({
      ...fields,
      [field]: value,
    });
  };
  const playerSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const newPlayer = {
        id: Date.now().toString(),
        name: fields["name"],
      };
      setPlayers((players) => [...players, newPlayer]);
    } else {
      console.log("Form has errors.");
    }
  };

  //text
  const [text, setText] = useState("Input Username");
  //useEffect
  useEffect(() => {
    if (!username) setShowModal(true);
    if (username) {
      setText(`Change Username`);
    } else {
      setText(`Input Username`);
    }
  }, [username]);

  return (
    <div className="bg-creamy flex justify-center">
      <div className="flex flex-col min-h-screen max-w-sm">
        <Modal
          setUsername={setUsername}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <header className="flex flex-col item-center mb-5 justify-center">
          <div className="flex justify-center">
            <img src={BemacoLogo} className="object-cover justify-bottom"></img>
          </div>
          <div className="flex">Antrian Maimai Hari ini</div>
          <div className="flex">Day, DD/MM/YYYY</div>
        </header>
        <div className="min-h-50vh mb-5 flex flex-col justify-center">
          <div className="mb-5 flex flex-col items-center">
            {/* table */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={players.map((player) => player.id)}
                strategy={verticalListSortingStrategy}
              >
                {players?.map((player, index) => (
                  <SortableItem
                    key={player.id}
                    id={player.id}
                    name={player.name}
                    idx={index}
                    itemSize={players.length}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
          {/* form */}
          <form onSubmit={(e) => playerSubmit(e)}>
            <div className="join flex justify-center">
              <input
                className="input input-bordered join-item"
                value={fields["name"]}
                onChange={(e) => handleChange("name", e.target.value)}
              ></input>
              <button
                type="submit"
                id="submit"
                value="submit"
                className="btn btn-secondary join-item"
                // onClick={handleAddPlayer}
              >
                Queue
              </button>
            </div>
            <div className="flex justify-center mb-5">
              <span className="text-error">{errors["name"]}</span>
              {console.log(showModal)}
            </div>
          </form>
          <div className="flex justify-center">
            <button className="btn w-52" onClick={() => setShowModal(true)}>
              {text}
            </button>
          </div>
        </div>
        <footer className="bg-maimai-background bg-center bg-cover bg-no-repeat bottom-0 w-full h-[31.25rem]"></footer>
      </div>
    </div>
  );
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setPlayers((players) => {
        const oldIndex = players.findIndex((player) => player.id === active.id);
        const newIndex = players.findIndex((player) => player.id === over.id);

        return arrayMove(players, oldIndex, newIndex);
      });
    }
  }
}
