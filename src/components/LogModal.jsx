import { fetchPlayersQueues, fetchUser } from '../actions'
import { useEffect, useState } from 'react'

const Modal = ({ showModal, setShowModal, restorePlayer }) => {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPlayersQueues = await fetchPlayersQueues()
      const queueLogs = await Promise.all(
        fetchedPlayersQueues.map(async (queue) => {
          const user = await fetchUser(queue.user_id)
          return { ...queue, userName: user.name }
        })
      )
      setLogs(queueLogs)
    }

    if (showModal) {
      fetchData()
    }
  }, [showModal])
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${day}/${month} ${hours}:${minutes}:${seconds}`
  }

  if (!showModal) return null
  return (
    <dialog id="my_modal_2" className="modal modal-open mb">
      <div className="modal-box w-auto max-h-96 sm:max-w-5xl max-w-md no-scrollbar">
        <h3 className="font-bold text-3xl mb-4">Log</h3>
        {logs.map((log) => (
          <form
            key={log.id}
            className="flex gap-4 justify-between items-center mb-5"
            onSubmit={(event) => {
              event.preventDefault()
              restorePlayer(log.players)
            }}
          >
            {}
            <div className="break-words max-w-32 min-w-32 sm:max-w-72 sm:min-w-72">
              {log.players ? log.players : 'No Data'}
            </div>
            <div className="truncate min-w-20 max-w-28">{log.userName}</div>
            <div className="max-w-28">{formatTimestamp(log.created_at)}</div>
            <button type="submit" className="btn btn-sm hover:btn-primary">
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
