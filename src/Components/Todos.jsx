import React, { useEffect, useState } from "react";

const Todos = () => {
  const [newTodo, setnewTodo] = useState("");
  const [todo, settodo] = useState([]);
  const [page, setpage] = useState(1);

  const saveInfo = () => {
    //Call API to store information in the backend
    fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
        isCompleted: false,
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        settodo([...todo, d]);
        setnewTodo("");
      });
  };

  useEffect(() => {
    fetch(`http://localhost:8080/todos?_page=${page}&_limit=5`)
      .then((r) => r.json())
      .then((d) => settodo(d));
  }, [page]);

  return (
    <div>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={({ target }) => {
            setnewTodo(target.value);
          }}
        />
        <button
          onClick={() => {
            saveInfo();
          }}
        >
          Save
        </button>
      </div>
      {todo.map((todo) => (
        <div key={todo.id}>{todo.text}</div>
      ))}
      <button onClick={()=> {
          if(page>=1){
            setpage(page-1)}
          }
          }>{`<`}</button>
      <button onClick={()=> {setpage(page+1)}}>{`>`}</button>
    </div>
  );
};

export default Todos;
