
import { useState, useEffect } from 'react';

function App() {
  const [Todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const gettodos = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/todos`,
        { method: "GET" },
      );
      const todos = await response.json();
      setTodos(todos);
    };
    gettodos();
  }, []);

  const createTodo = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/todos`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      },
    );
    const newTodo = await response.json();
    setTask("");
    setTodos([...Todos, newTodo]);
  }

  const deleteTodo = async (todoId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/todos/${todoId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) return;

    setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  }

  return (
    <div classname="App">

      <form onSubmit={createTodo}>
        <input
          type='text'
          value={task}
          onChange={handleChange}
          placeholder='Enter the new todo'
        />
        <button type="submit" className="todo-app-button">Create todo</button>
      </form>

      <div>
        {Todos.length > 0 ? (
          Todos.map((todo) => (
            <div>
              <p>{todo.task}</p>
              <p>{todo.status ? "completed" : "pending"}</p>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
          ))
        ) : (
          <div>
            <p>no todos found</p>
          </div>

        )
        }
      </div>
    </div>
  );
}

export default App;
