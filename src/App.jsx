import { useEffect, useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  function handleChange(e) {
    setTodo(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (todo.length <= 0) {
      return;
    } else {
      setTodoList(() => [todo, ...todoList]);
      setTodo("");
    }
  }

  useEffect(() => {
    const todos = localStorage.getItem("todo");
    const parsedTodos = JSON.parse(todos);
    if (todos) {
      setTodoList(parsedTodos);
    }
  }, []);

  useEffect(() => {
    console.log("Running");
    localStorage.setItem("todo", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={todo}
          type="text"
          placeholder="Enter todo here"
        />
        <button>+</button>
      </form>
      <hr></hr>
      <div>
        {todoList.map((todo, index) => (
          <p key={index}>{todo}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
