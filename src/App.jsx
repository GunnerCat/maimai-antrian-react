import { useState, useEffect } from 'react'
import Modal from './components/Modal.jsx'
import BemacoLogo from './assets/BemacoLogo.png'
import NoPlayer from './assets/NoPlayer.png'
import Home from './assets/Home.png'
import LogModal from './components/LogModal.jsx'

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

import { SortableItem } from './components/SortableList.jsx'
import { DroppableArea } from './components/DroppableArea.jsx'
import { motion } from 'framer-motion'

import { fetchPlayersQueues, savePlayersQueue } from './actions.js'

export default function App() {
  // Local player testing / datas
  const [players, setPlayers] = useState([])
  const [originalPlayers, setOriginalPlayers] = useState([])
  const [hasChanges, setHasChanges] = useState(false)

  const [username, setUsername] = useState(localStorage.getItem('username'))

  // Modal
  const [showModal, setShowModal] = useState(false)
  const [showLogModal, setShowLogModal] = useState(false)

  // Click counter for BemacoLogo
  const [logoClickCount, setLogoClickCount] = useState(0)

  // DnD
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const [activeItem, setActiveItem] = useState(null)
  const handleDragStart = (event) => {
    setActiveItem(players.find((player) => player.id === event.active.id))
  }

  const handleLogoClick = () => {
    if (logoClickCount + 1 >= 7) {
      setShowLogModal(true)
      setLogoClickCount(0)
    } else {
      setLogoClickCount(logoClickCount + 1)
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveItem(null)

    if (!over) return

    if (over.id === 'droppable') {
      const player = players.find((player) => player.id === active.id)
      if (player) {
        setPlayers((players) =>
          players.filter((player) => player.id !== active.id)
        )
      }
    } else {
      const oldIndex = players.findIndex((player) => player.id === active.id)
      const newIndex = players.findIndex((player) => player.id === over.id)

      setPlayers((players) => arrayMove(players, oldIndex, newIndex))
    }
  }

  // Form and validation
  const [fields, setFields] = useState({})
  const [errors, setErrors] = useState({})

  const handleValidation = () => {
    const formFields = { ...fields }
    const formErrors = {}
    let formIsValid = true
    if (!formFields['name']) {
      formIsValid = false
      formErrors['name'] = 'Name cannot be empty'
    } else if (formFields['name'].length > 30) {
      formIsValid = false
      formErrors['name'] = 'Name cannot be more than 30 characters'
    }
    setErrors(formErrors)
    return formIsValid
  }

  const handleChange = (field, value) => {
    setFields({
      ...fields,
      [field]: value
    })
  }

  const playerSubmit = (e) => {
    e.preventDefault()
    if (handleValidation()) {
      const newPlayer = {
        id: Date.now().toString(),
        name: fields['name']
      }
      setPlayers((players) => [...players, newPlayer])
      fields['name'] = ''
    } else {
      console.log('Form has errors.')
    }
  }

  // Text
  const [text, setText] = useState('Input Username')

  // useEffect
  useEffect(() => {
    if (!username) setShowModal(true)
    setText(username ? 'Change Username' : 'Input Username')
  }, [username])

  // Fetch data
  const fetchData = async () => {
    try {
      const playersQueues = await fetchPlayersQueues()
      if (playersQueues[0].players === '') return
      const playersArray = playersQueues[0].players.split(', ')
      const players = playersArray.map((item, index) => ({
        id: index + 1,
        name: item
      }))

      setPlayers(players)
      setOriginalPlayers(players)
    } catch (error) {
      console.error('Error fetching player data:', error)
    }
  }
  const restorePlayer = (players) => {
    const playerArrays = players.split(', ')
    const playersList = playerArrays.map((item, index) => ({
      id: index + 1,
      name: item
    }))
    setPlayers(playersList)
    setShowLogModal(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setHasChanges(JSON.stringify(players) !== JSON.stringify(originalPlayers))
  }, [players])

  const handleSave = async () => {
    // youyoumu
    if (!username) {
      alert('Please input username')
      return
    }
    if (await savePlayersQueue(players)) {
      setOriginalPlayers(players)
      setHasChanges(false)
      alert('Changes saved!')
    }
  }

  const handleCancel = () => {
    setPlayers(originalPlayers)
  }
  const timeNow = () => {
    const date = new Date('2024-05-28')
    const options = {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }
    return date.toLocaleDateString('en-GB', options).replace(',', '')
  }

  return (
    <div className="bg-creamy flex justify-center">
      <div className="flex flex-col min-h-screen max-w-sm">
        <Modal
          setUsername={setUsername}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <LogModal
          showModal={showLogModal}
          setShowModal={setShowLogModal}
          restorePlayer={restorePlayer}
        />
        <header className="flex flex-col item-center mb-5 justify-center items-center">
          <div className="flex justify-center">
            <img
              src={BemacoLogo}
              className="object-cover justify-bottom"
              alt="Bemaco Logo"
              onClick={handleLogoClick}
            ></img>
          </div>
          <div className="text-3xl text-cyan-800">Antrian Maimai Hari ini</div>
          <div className="text-2xl">
            {'Hi, ' + (username ? username : 'New Player')}!
          </div>
          <div className="text-2xl">{timeNow()}</div>
        </header>
        <div>
          {/* Table */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <motion.div
              transition={{ duration: 0.5 }}
              className="mb-5 p-5 bg-rose-500 rounded-lg"
              style={{ transition: 'all 0.5s' }}
            >
              <div className="rounded-lg overflow-hidden gap-0.5 flex flex-col ">
                <SortableContext
                  items={players.map((player) => player.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {players.length >= 1 ? (
                    players.map((player) => (
                      <SortableItem
                        key={player.id}
                        id={player.id}
                        name={player.name}
                        drag={activeItem?.id === player.id}
                      />
                    ))
                  ) : (
                    <div className="bg-amber-100  p-2">
                      <img
                        src={NoPlayer}
                        className="object-cover justify-bottom"
                        alt="NoPlayer"
                      ></img>
                      <span className="flex justify-center">
                        Currently There is no Player!
                      </span>
                    </div>
                  )}
                </SortableContext>
                <DragOverlay
                  dropAnimation={{
                    duration: 250,
                    easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)'
                  }}
                >
                  {activeItem ? (
                    <SortableItem
                      key={activeItem.id}
                      id={activeItem.id}
                      name={activeItem.name}
                      drag={false}
                    />
                  ) : null}
                </DragOverlay>
              </div>
            </motion.div>
            <form onSubmit={(e) => playerSubmit(e)}>
              <div className="join flex justify-center mb-5">
                <input
                  className="input input-bordered join-item"
                  value={fields['name']}
                  onChange={(e) => handleChange('name', e.target.value)}
                ></input>
                <button
                  type="submit"
                  id="submit"
                  value="submit"
                  className="btn btn-secondary join-item"
                >
                  Queue
                </button>
              </div>
              <div className="flex justify-center">
                <span className="text-error">{errors['name']}</span>
              </div>
            </form>

            {/* Droppable Area */}
            {activeItem && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1 }}
                className="flex justify-center mb-5"
              >
                <DroppableArea id="droppable">
                  <h3>Remove Player here</h3>
                </DroppableArea>
              </motion.div>
            )}
          </DndContext>
        </div>
        <div className="mb-5 flex flex-col justify-center">
          {/* Form */}
          {hasChanges && (
            <div className="flex justify-center mb-5">
              <button
                className="btn bg-teal-200 mr-2"
                disabled={!hasChanges}
                onClick={handleSave}
              >
                Save
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}

          <div className="flex justify-center">
            <button className="btn w-52" onClick={() => setShowModal(true)}>
              {text}
            </button>
          </div>
        </div>
        <footer
          style={{ backgroundImage: `url(${Home})` }}
          className="bg-maimai-background bg-center bg-cover bg-no-repeat bottom-0 w-full h-[31.25rem]"
        ></footer>
      </div>
    </div>
  )
}
