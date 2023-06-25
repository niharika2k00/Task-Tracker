import React, { useEffect } from "react";
import "../styles/modal.css";

interface PropsType {
  type: string;
  closeHandler: any;
  editItemHandler(id: number, updatedText: string): void;
  addItemHandler(): void;
  id: number;
  setEditItem: any;
  editItem: { id: number; text: string; label: string; isComplete: boolean };
  handleKeyPress(e: any): void;
  getInput(e: any): void;
  setLabelVal(val: string): void;
  value: string;
}

const ModalEdit: React.FC<PropsType> = (props) => {
  var { closeHandler, ...args } = props;

  const onChangeEditItemHandler = (e: any) => {
    args.setEditItem({ ...args.editItem, text: e.target.value });
    console.log(args.editItem);
    console.log(args.type);
  };

  const saveHandler = (type: string) => {
    switch (type) {
      case "create":
        args.addItemHandler();
        break;

      case "edit":
        args.editItemHandler(args.id, args.editItem.text);
        break;
    }
  };

  useEffect(() => {
    console.log("ID : ", args.id);
    console.log("editItem : ", args.editItem);
  }, [args.editItem]);

  const labels: { id: number; title: string; style: string }[] = [
    {
      id: 1,
      title: "Low Priority",
      style: "low",
    },
    {
      id: 2,
      title: "Medium Priority",
      style: "medium",
    },
    {
      id: 3,
      title: "High Priority",
      style: "high",
    },
  ];

  return (
    <>
      {/* Dialog/Modal close on clicking outside. */}
      <div className="darkBG" onClick={() => closeHandler(false)} />

      <div className="centered">
        <div className="modal">
          {args.type === "create" && (
            <>
              <h3 className="modal-heading"> Add Task </h3>
              <input
                name="todo"
                value={args.value}
                type="text"
                placeholder="write your plans..."
                onKeyPress={args.handleKeyPress}
                onChange={args.getInput}
                id="input-box"
              />

              <div
                className="labelcontent"
                onChange={(e) => args.setLabelVal(e.target.value)}
              >
                {labels.map((obj, idx) => {
                  return (
                    <>
                      <p style={{ fontSize: "1.5rem" }} key={idx}>
                        <input type="radio" value={obj.title} name="label" />
                        <span> {obj.title} </span>
                      </p>
                    </>
                  );
                })}
              </div>
            </>
          )}

          {args.type === "edit" && (
            <>
              <h3 className="modal-heading">Edit Todo</h3>

              <div>
                <input
                  name="todo"
                  value={args.editItem.text}
                  type="text"
                  onChange={(e) => onChangeEditItemHandler(e)}
                  id="input-box"
                />
              </div>
            </>
          )}

          <div id="buttonFlex">
            <button
              type="button"
              className="button cancelBtn"
              value="cancel"
              onClick={() => closeHandler(false)}
            >
              Cancel
            </button>

            <button
              type="button"
              className="button saveBtn"
              value="save"
              onClick={() => saveHandler(args.type)}
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
