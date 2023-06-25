import React, { useEffect } from "react";
import "../styles/modal.css";

interface Props {
  setIsOpen: any;
  editItemHandler(id: number, updatedText: string): void;
  id: number;
  setEditItem: any;
  editItem: any;
}

const ModalEdit: React.FC<Props> = (props) => {
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

          <div>
            <input
              name="todo"
              value={editItem.text}
              type="text"
              onChange={(e) => onChangeEditItemHandler(e)}
              id="input-box"
            />
          </div>

          <div id="buttonFlex">
            <button
              type="button"
              className="button cancelBtn"
              value="cancel"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>

            <button
              type="button"
              className="button saveBtn"
              value="save"
              onClick={() => editItemHandler(id, editItem.text)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEdit;
