import React, { useEffect } from "react";
import "../styles/modal.css";

interface Props {
  setIsOpen: any;
  editItemHandler(id: number, updatedText: string): void;
  id: number;
  setEditItem: any;
  editItem: any;
}

const Modal: React.FC<Props> = (props) => {
  var { setIsOpen, editItemHandler, id, setEditItem, editItem } = props;

  const onChangeEditItemHandler = (e: any) => {
    setEditItem({ ...editItem, text: e.target.value });
    console.log(editItem);
  };

  useEffect(() => {
    console.log("ID : ", id);
    console.log("editItem : ", editItem);
  }, [editItem]);

  return (
    <>
      {/* Dialog/Modal close on clicking outside. */}
      <div className="darkBG" onClick={() => setIsOpen(false)} />

      <div className="centered">
        <div className="modal">
          <h3 className="modal-heading">Edit Todo</h3>

          <div className="content">
            <input
              name="todo"
              value={editItem.text}
              type="text"
              onChange={(e) => onChangeEditItemHandler(e)}
              id="input-box"
            />
          </div>

          <button
            type="button"
            className="button savebtn"
            value="save"
            onClick={() => editItemHandler(id, editItem.text)}
          >
            Save
          </button>

          <button
            type="button"
            className="button cancelbtn"
            value="save"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
