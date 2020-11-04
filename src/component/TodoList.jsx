import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import List from "./List";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [taskList, setTaskList] = useState([]);

  function fechData() {
    const additionalSetting = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      // body: JSON.stringify(tasks)
    };
    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/freddy",
      additionalSetting
    )
      .then((response) => response.json())
      .then((newResponse) => {
        console.log(newResponse);
        // JSON a TEXTO   = JSON.stringify()
        // TEXTO A JSON   = JSON.parse()
        setTaskList(newResponse);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    // EFECTOS`
    fechData();
  }, []);
  console.log(taskList);

  ///////////////////// AÑADIR NUEVAS TAREAS /////////////////////
  const addTodo = (todo) => {
    const tasks = {
      label: todo.label,
      done: false,
    };
    // console.log(tasks, taskList);
    // taskList.map((item) => {
    //   setTaskList(task => item.label === "sample task" ? [task] : [...taskList, task]);
    // });
    // console.log(taskList)
    const additionalSetting = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify([...taskList, tasks]),
    };
    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/freddy",
      additionalSetting
    )
      .then((response) => response.text())
      .then((newResponse) => {
        console.log(newResponse);
      })
      .catch((error) => console.log(error));

    fechData();
  };

  ///////////////////// ACTUALIZAR LAS TAREAS /////////////////////

  const updateTodo = (newValue, i) => {
    console.log(newValue, i);

    taskList.splice(i, 1, newValue)
    setTaskList(taskList);
    // setTaskList((taskList) =>
    //   taskList.map((item, index) => (index === i ? newValue : item))
    // );

    console.log(taskList);

    const additionalSetting = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify([...taskList]),
    };

    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/freddy",
      additionalSetting
    )
      .then((response) => response.json())
      .then((newResponse) => {
        console.log(newResponse);
      })
      .catch((error) => console.log(error));

    console.log(newValue, i);

  };

  ///////////////////// ELIMINAR LAS TAREAS /////////////////////

  const removeTodo = (index) => {
    // const removeArr = [...todos].filter((todo) => todo.id !== id);
    // setTodos(removeArr);

    if (index !== 0) {
      taskList.splice(index, 1);
      setTaskList([...taskList]);
      console.log("aqui esta la pregunta", taskList);
    };

    const additionalSetting = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify([...taskList]),
    };

    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/freddy",
      additionalSetting
    )
      .then((response) => response.text())
      .then((newResponse) => {
        console.log(newResponse);
      })
      .catch((error) => console.log(error));
  };

  const completeTodo = (index) => {
    const updateTodos = taskList.map((todo, i) => {
      if (i === index) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  return (
    <>
      <div className="box">
        <h1 className="tittle">TO DO LIST!!</h1>
        <div className="boxList">
          <TodoForm onKeyPress={addTodo} />
          <List
            todos={taskList}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
          <div className="length">{taskList.length - 1} item left</div>
        </div>
      </div>
    </>
  );
};
export default TodoList;
