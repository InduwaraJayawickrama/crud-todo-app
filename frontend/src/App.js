
import { useState, useEffect } from 'react';

function App() {
  const [ Todos, setTodos ] = useState([]);

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

  return (
    <div classname="App">
      <h1>Task Manager</h1>
      <div>
        {Todos.length > 0 ? (
            Todos.map((todo) => (
              <div>
                <p>{todo.task}</p>
                <p>{todo.status ? "completed" : "pending"}</p>
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
