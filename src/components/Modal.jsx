import { useRef, useState } from 'react'
import { signUp } from '../actions'

/* eslint-disable react/prop-types */
const Modal = ({ setUsername, showModal, setShowModal }) => {
  const [inputName, setInputName] = useState('')

  const handleUsernameSubmit = async () => {
    const userData = await signUp(inputName)
    if (userData) {
      localStorage.setItem('username', userData.name)
      localStorage.setItem('id', userData.id)
      setUsername(userData.name)
      setShowModal(false)
    }
  }

  const inputElement = useRef()
  if (!showModal) return null

  return (
    <dialog id="my_modal_2" className="modal modal-open">
      <div className="modal-box w-auto">
        <p className="mb-3">
          {localStorage.getItem('username') === null
            ? 'Please enter username'
            : 'Please enter new username'}
        </p>
        <form method="dialog" className="join">
          <input
            className="input input-bordered join-item"
            value={inputName}
            ref={inputElement}
            onChange={(e) => setInputName(e.target.value)}
          ></input>
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
  )
}

export default Modal
