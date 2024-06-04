import { fetchPlayersQueues, fetchUser } from '../actions'
import { useEffect, useState } from 'react'

const Modal = ({ showModal, setShowModal }) => {
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
      <div className="modal-box w-auto">
        <h3 className="font-bold text-lg">Log</h3>
        {users.map((user) => (
          <div
            key={user.id}
            className="flex gap-4 justify-between items-center mb-5"
          >
            {user.players ? (
              <div className="break-words max-w-44 sm:max-w-none  ">
                {user.players}
              </div>
            ) : (
              <div> No Data </div>
            )}
            <div>{user.userName}</div>
          </div>
        ))}
      </div>
      <div className="modal-backdrop">
        <button onClick={() => setShowModal(false)}>close</button>
      </div>
    </dialog>
  )
}

export default Modal
