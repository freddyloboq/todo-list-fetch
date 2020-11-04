import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const List = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    value: "",
    index: 0,
  });

  const submitUpdate = (value) => {
    console.log(value)
    updateTodo(value, edit.index);

    setEdit({
      value: "",
      index: 0,
    });

  };

  if (edit.index) {
    return <TodoForm edit={edit} onKeyPress={(value) => submitUpdate(value)} />;
  }
  console.log(todos);
  return todos.map((todo, index) => {
    console.log(todo);
    return (
      <div
        className={todo.isComplete ? "todo-row complete" : "todo-row"}
        key={index}
      >
        <div key={index} onClick={() => completeTodo(index)}>
          {todo.label}
        </div>
        <div className="icons">
          <RiCloseCircleLine
            onClick={() => removeTodo(index)}
            className="delete-icon"
          />
          <TiEdit
            onClick={() => setEdit({ value: todo.label, index: index })}
            className="edit-icon"
          />
        </div>
      </div >
    )
  });
};

export default List;
