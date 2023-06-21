import React, { useState, useEffect } from "react";
import Modal from "./modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import deleteIcon from "../assets/bin.png";
import editIcon from "../assets/edit.png";

interface TodoProps {
  readonly id: number;
  text: string;
  isComplete: boolean;
}

function HomeScreen() {
  const [value, setValue] = useState<string>("");
  const [todoArr, setTodoArr] = useState<TodoProps[]>([]); // array of objects
  const [isOpen, setIsOpen] = useState(false);
  const [openItemId, setOpenItemId] = useState(0);
  const [editItem, setEditItem] = useState({});

  const getUniqueId = (): number => {
    let random = Math.floor(Math.random() * 9000 + 1000);
    return random;
  };

  //   function getDarkColor() {
  //     var color = '#';
  //     for (var i = 0; i < 6; i++) {
  //         color += Math.floor(Math.random() * 10);
  //     }
  //     return color;
  // }

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

  const isChecked = (isComplete: boolean): string => {
    return isComplete ? "checked-item" : "not-checked-item";
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
      isComplete: false,
    };

    setTodoArr([...todoArr, todoObj]);
    setValue("");
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

  useEffect(() => {
    console.log(todoArr);

    // return () => {
    // console.log(todoArr);
    // };
  }, [todoArr]);

  // const [todos, setTodos] = useState(() => {
  //   const savedTodos = localStorage.getItem("todos");
  //   if (savedTodos) {
  //     return JSON.parse(savedTodos);
  //   } else {
  //     return [];
  //   }
  // });

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  return (
    <>
      <div className="maincard">
        <section>
          <input
            name="todo"
            value={value}
            type="text"
            placeholder="write your plans..."
            onKeyPress={handleKeyPress}
            onChange={getInput}
            id="input-box"
          />

          <button
            type="button"
            className="button"
            value="add todo"
            onClick={addItemHandler}
          >
            <FontAwesomeIcon icon={faPlus} /> Todo
          </button>
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
                        <span className={isChecked(obj.isComplete)}>
                          {obj.text}
                        </span>
                      </div>

                      <div>
                        <span className="editBox" onClick={onClickEditHandler}>
                          <img
                            src={editIcon}
                            alt="edit"
                            style={{ height: "1.6rem" }}
                          />
                        </span>

                        {isOpen && openItemId === obj.id && (
                          <Modal
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
