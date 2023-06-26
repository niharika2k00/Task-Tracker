import { useState, useEffect } from "react";
import Modal from "./modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import deleteIcon from "../assets/bin.png";
import editIcon from "../assets/edit.png";

export interface TodoProps {
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
  const [editItem, setEditItem] = useState<TodoProps>({
    id: 1,
    text: "",
    label: "",
    isComplete: false,
  }); // edit item object

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

  const handleCheck = (id: number): void => {
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

    setTodoArr([...todoArr]);
    setIsOpen(false);
  };

  // If return arr of obj --> TodoProps[]
  const deleteItemHandler = (id: number): void => {
    let modifiedArr = todoArr.filter((obj) => {
      return obj.id !== id;
    });

    setTodoArr(modifiedArr);
    console.log("modifiedArr : ", modifiedArr);
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
        <section id="buttonBar">
          {isOpenLabel && (
            <Modal
              type="create"
              closeHandler={setIsOpenLabel}
              addItemHandler={addItemHandler}
              handleKeyPress={handleKeyPress}
              getInput={getInput}
              value={value}
              setLabelVal={setLabelVal}
            />
          )}

          <button
            type="button"
            className="button addBtn"
            value="add"
            onClick={() => setIsOpenLabel(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Task
          </button>

          {todoArr.length > 0 && (
            <button
              type="button"
              className="button clearallBtn"
              value="delete all"
              onClick={() => setTodoArr([])}
            >
              Clear All
            </button>
          )}
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
                      <div style={{ paddingLeft: "1rem" }}>
                        <input
                          type="checkbox"
                          value={obj.text}
                          onChange={() => handleCheck(obj.id)}
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
                          <Modal
                            type="edit"
                            key={idx}
                            closeHandler={setIsOpen}
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
