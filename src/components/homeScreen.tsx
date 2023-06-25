import React, { useState, useEffect } from "react";
import EditModal from "./editModal";
import LevelSelectionModal from "./levelSelectionModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import deleteIcon from "../assets/bin.png";
import editIcon from "../assets/edit.png";

interface TodoProps {
  readonly id: number;
  text: string;
  label: string;
  isComplete: boolean;
}

function HomeScreen() {
  // Get todos from LocalStorage if available otherwise return []empty
  // const [todoArr, setTodoArr] = useState<TodoProps[]>([]); // array of objects before LocalStorage implementation
  const [todoArr, setTodoArr] = useState<TodoProps[]>(() => {
    const savedTodoArr = localStorage.getItem("todoArr");
    if (savedTodoArr) return JSON.parse(savedTodoArr);
    else return [];
  });
  const [value, setValue] = useState<string>("");
  const [labelVal, setLabelVal] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenLabel, setIsOpenLabel] = useState<boolean>(false);
  const [openItemId, setOpenItemId] = useState<number>(0);
  const [editItem, setEditItem] = useState({});

  const getUniqueId = (): number => {
    let random = Math.floor(Math.random() * 9000 + 1000);
    return random;
  };

  const handleKeyPress = (e: any): void => {
    if (e.key === "Enter") {
      if (e.target.value.length < 1) {
        alert("Please write something.");
        return;
      }

      setValue(e.target.value);
      addItemHandler();
    }
  };

  const getInput = (e: any): void => {
    // console.log(e.target.value);
    setValue(e.target.value);
  };

  const handleCheck = (e: any, id: number): void => {
    // console.log(e.target.checked);
    let modifiedArr = todoArr.map((obj) => {
      if (obj.id === id) obj.isComplete = !obj.isComplete;
      return obj;
    });

    setTodoArr(modifiedArr);
  };

  const labelColor = (label: string): string => {
    if (label.startsWith("Low")) return "labelBox low";
    else if (label.startsWith("Medium")) return "labelBox medium";
    else return "labelBox high";
  };

  const addItemHandler = (): void => {
    if (value === "") {
      alert("Please write something.");
      return;
    }

    console.log(value);
    let todoObj: TodoProps = {
      id: getUniqueId(),
      text: value,
      label: labelVal === "" ? "Medium Priority" : labelVal,
      isComplete: false,
    };

    setTodoArr([...todoArr, todoObj]);
    setValue("");
    setIsOpenLabel(false);
  };

  // If return arr of obj --> TodoProps[]
  const deleteItemHandler = (id: number): void => {
    let modifiedArr = todoArr.filter((obj) => {
      return obj.id !== id;
    });

    setTodoArr(modifiedArr);
    console.log("modifiedArr : ", modifiedArr);
  };

  const editItemHandler = (id: number, updatedText: string): void => {
    console.log(
      "Id = ",
      id,
      "\nMain arr : ",
      todoArr,
      "\nUpdated text : ",
      updatedText
    );

    todoArr.forEach((obj) => {
      if (obj.id === id) obj.text = updatedText;
    });

    setIsOpen(false);
  };

  const customElipsis = (input: string): string => {
    return input.length > 112 ? `${input.substring(0, 112)}...` : input;
  };

  useEffect(() => {
    console.log(todoArr);
    localStorage.setItem("todoArr", JSON.stringify(todoArr));
  }, [todoArr]);

  return (
    <>
      <div className="maincard">
        <section style={{ textAlign: "center", paddingTop: "1.6rem" }}>
          {/* <input
            name="todo"
            value={value}
            type="text"
            placeholder="write your plans..."
            onKeyPress={handleKeyPress}
            onChange={getInput}
            id="input-box"
          /> */}

          {isOpenLabel && (
            <LevelSelectionModal
              setIsOpenLabel={setIsOpenLabel}
              addItemHandler={addItemHandler}
              handleKeyPress={handleKeyPress}
              getInput={getInput}
              value={value}
              setLabelVal={setLabelVal}
            />
          )}

          <button
            type="button"
            className="button"
            value="add priority"
            onClick={() => setIsOpenLabel(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Task
          </button>

          {todoArr.length > 0 && (
            <button
              type="button"
              className="button"
              value="delete all"
              onClick={() => setTodoArr([])}
            >
              Clear All
            </button>
          )}

          {/* <button
            type="button"
            className="button"
            value="add todo"
            onClick={addItemHandler}
          >
            <FontAwesomeIcon icon={faPlus} /> Todo
          </button> */}
        </section>

        <section>
          <ul style={{ padding: "6px" }}>
            {todoArr &&
              todoArr.length > 0 &&
              todoArr.map((obj, idx) => {
                const onClickEditHandler = () => {
                  setIsOpen(true);
                  setOpenItemId(obj.id);
                  setEditItem(obj); // current obj to be edited
                };

                return (
                  <>
                    {/* <li key={idx}> */}
                    <div id="list" key={idx}>
                      <div>
                        <input
                          type="checkbox"
                          value={obj.text}
                          onChange={(e) => handleCheck(e, obj.id)}
                          style={{ marginRight: "1rem" }}
                        />
                        <span
                          className={
                            obj.isComplete ? "checked-item" : "not-checked-item"
                          }
                        >
                          {customElipsis(obj.text)}
                        </span>
                      </div>

                      <div className={labelColor(obj.label)}> {obj.label} </div>

                      <div style={{ textAlign: "center" }}>
                        <span className="editBox" onClick={onClickEditHandler}>
                          <img
                            src={editIcon}
                            alt="edit"
                            style={{ height: "1.6rem" }}
                          />
                        </span>

                        {isOpen && openItemId === obj.id && (
                          <EditModal
                            key={idx}
                            setIsOpen={setIsOpen}
                            editItemHandler={editItemHandler}
                            id={obj.id}
                            setEditItem={setEditItem}
                            editItem={editItem}
                          />
                        )}

                        <span
                          onClick={() => deleteItemHandler(obj.id)}
                          className="deleteBox"
                        >
                          <img
                            src={deleteIcon}
                            alt="X"
                            style={{ height: "1.6rem" }}
                          />
                        </span>
                      </div>
                    </div>
                    {/* </li> */}
                  </>
                );
              })}
          </ul>
        </section>
      </div>
    </>
  );
}

export default HomeScreen;
