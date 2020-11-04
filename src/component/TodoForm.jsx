import React, { useState, useEffect, useRef } from "react";

const TodoForm = (props) => {
  // console.log(props)
  const [input, setImput] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setImput(e.target.value);
  };

  const handleKeyPress = (e) => {
    var key = e.keyCode || e.which;

    if (key === 13) {
      e.preventDefault();
      props.onKeyPress({
        label: input,
        done: false,
      });
      setImput("");
    }
  };

  return (
    <form className="todo-input">
      <input
        type="text"
        name="enterType"
        className="enterType"
        placeholder="Add a todo"
        value={input}
        onKeyPress={(e) => handleKeyPress(e)}
        onChange={handleChange}
        ref={inputRef}
      />
    </form>
  );
};

export default TodoForm;
