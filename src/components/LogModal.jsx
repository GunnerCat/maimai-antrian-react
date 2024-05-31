import { fetchPlayersQueues } from '../actions'
import { useEffect, useState } from 'react'

const Modal = ({ showModal, setShowModal }) => {
  const [playersQueues, setPlayersQueues] = useState([])

  useEffect(() => {
    const playersQueues = async () => {
      const playersQueues = await fetchPlayersQueues()
      setPlayersQueues(playersQueues)
    }
    playersQueues()
  }, [showModal])

  if (!showModal) return null

  function Log() {
    return playersQueues.map((queue) => {
      return (
        <div key={queue.id} className="flex gap-4">
          <div>{queue.players}</div>
          <div>{queue.user_id}</div>
        </div>
      )
    })
  }

  return (
    <dialog id="my_modal_2" className="modal modal-open">
      <div className="modal-box w-auto">
        <h3 className="font-bold text-lg">Log</h3>
        <Log />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setShowModal(false)}>close</button>
      </form>
    </dialog>
  )
}

export default Modal
