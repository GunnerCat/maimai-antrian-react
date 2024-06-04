import { fetchPlayersQueues, fetchUser } from '../actions'
import { useEffect, useState } from 'react'

const Modal = ({ showModal, setShowModal, restorePlayer }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPlayersQueues = await fetchPlayersQueues()
      const queueUsers = await Promise.all(
        fetchedPlayersQueues.map(async (queue) => {
          const user = await fetchUser(queue.user_id)
          return { ...queue, userName: user.name }
        })
      )
      setUsers(queueUsers)
    }

    if (showModal) {
      fetchData()
    }
  }, [showModal])

  if (!showModal) return null

  return (
    <dialog id="my_modal_2" className="modal modal-open mb">
      <div className="modal-box w-auto max-h-96 no-scrollbar">
        <h3 className="font-bold text-lg">Log</h3>
        {users.map((user) => (
          <form
            key={user.id}
            className="flex gap-4 justify-between items-center mb-5"
            onSubmit={(event) => {
              event.preventDefault()
              restorePlayer(user.players)
            }}
          >
            <div className="break-words max-w-44 min-w-44 sm:max-w-none sm:min-w-72">
              {user.players ? user.players : 'No Data'}
            </div>
            <div className="truncate min-w-20 max-w-28">{user.userName}</div>
            <button type="submit" className="btn btn-sm hover:bg-blue-500">
              Restore
            </button>
          </form>
        ))}
      </div>
      <div className="modal-backdrop">
        <button onClick={() => setShowModal(false)}>close</button>
      </div>
    </dialog>
  )
}

export default Modal
