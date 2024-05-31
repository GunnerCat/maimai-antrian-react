const Modal = ({ showModal, setShowModal }) => {
  if (!showModal) return null

  return (
    <dialog id="my_modal_2" className="modal modal-open">
      <div className="modal-box w-auto">it worked</div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setShowModal(false)}>close</button>
      </form>
    </dialog>
  )
}

export default Modal
