import { useEffect, useState } from 'react';

const Modal = () => {
  const [username, setUsername] = useState('');
  const [shouldRender, setShouldRender] = useState(false);

  const handleAddUsername = () => {
    localStorage.setItem("username", username);
    setShouldRender(true);
  };

  useEffect(() => {
    // Re-render the page
    if (shouldRender) {
      window.location.reload();
    }
  }, [shouldRender]);

  return (
    <dialog id="my_modal_2" className="modal">
    <div className="modal-box w-auto">
      
      <p className="mb-3">{localStorage.getItem("username") == '' ?  'Please enter USERNAME' : 'Please enter NEW USERNAME'}</p>
      <form method="dialog" className="join">
        <input className="input input-bordered join-item" value={username} onChange={(e) => setUsername(e.target.value)} ></input>
        <button
          className="btn btn-secondary join-item"
          onClick={handleAddUsername}
        >
          Queue
        </button>
      </form>
    </div>
    <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
  </dialog>
  );
};

export default Modal;