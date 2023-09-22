import { useState } from 'react';

function Item({ key, description, handleDelete }) {
  return (
    <li key={key} >
      {description}
      <button onClick={handleDelete}>
        ×
      </button>
    </li>
  )
}

export default function ToDo() {
  const [key, setKey] = useState(0);
  const [item, setItem] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleCreate = () => {
    if (item === '') return;

    setTodoList(todoList.concat({ id: key, description: item }));
    setKey(key + 1);
    setItem('');
  }

  const handleDelete = (id) => {
    setTodoList(
      todoList.filter((item) => id !== item.id)
    );
  }

  return (
    <>
      <h1>
        To-Do List
      </h1>

      <p>Hi King! This is Ran, speaking to you from a remote app</p>

      <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
      <button onClick={handleCreate}>Submit</button>

      <ol>
        {
          todoList.map((item) => (
            <Item
              key={item.id}
              description={item.description}
              handleDelete={() => handleDelete(item.id)}
            />
          ))
        }
      </ol>
    </>
  )
}
