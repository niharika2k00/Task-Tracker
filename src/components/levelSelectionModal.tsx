import React, { useEffect } from "react";
import "../styles/modal.css";

interface Props {
  setIsOpenLabel: any;
  addItemHandler(): void;
  handleKeyPress(e: any): void;
  getInput(e: any): void;
  value: string;
  setLabelVal(val: string): void;
  // id: number;
  // setEditItem: any;
  // editItem: any;
}

const LabelSelectionModal: React.FC<Props> = (props) => {
  var {
    setIsOpenLabel,
    addItemHandler,
    handleKeyPress,
    getInput,
    value,
    setLabelVal,
  } = props;

  const onChangeLabelHandler = (e) => {
    console.log(e.target.value);
    setLabelVal(e.target.value);
  };

  // const onChangeEditItemHandler = (e: any) => {
  //   setEditItem({ ...editItem, text: e.target.value });
  //   console.log(editItem);
  // };

  // useEffect(() => {
  //   console.log("ID : ", id);
  //   console.log("editItem : ", editItem);
  // }, [editItem]);

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
      <div className="darkBG" onClick={() => setIsOpenLabel(false)} />

      <div className="centered">
        <div className="modal">
          <h3 className="modal-heading">Add Task</h3>
          <input
            name="todo"
            value={value}
            type="text"
            placeholder="write your plans..."
            onKeyPress={handleKeyPress}
            onChange={getInput}
            id="input-box"
          />

          <div className="labelcontent" onChange={onChangeLabelHandler}>
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

          <div id="buttonFlex">
            <button
              type="button"
              className="button cancelBtn"
              value="cancel"
              onClick={() => setIsOpenLabel(false)}
            >
              Cancel
            </button>

            <button
              type="button"
              className="button saveBtn"
              value="save"
              onClick={addItemHandler}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LabelSelectionModal;
