import { useState } from 'react';

function Item({ description, handleDelete }) {
  return (
    <li>
      {description}
      <button onClick={handleDelete}>
        ×
      </button>
    </li>
  )
}

export default function ToDo({
  items = [],
  handleCreate = () => Promise.resolve(),
  handleDelete = () => Promise.resolve()
}) {
  const [key, setKey] = useState(items.length + 1);
  const [item, setItem] = useState('');
  const [todoList, setTodoList] = useState(items);

  const handleSubmit = () => {
    if (item === '') return;

    handleCreate(item)
      .then(() => {
        setTodoList(todoList.concat({ id: key, description: item }));
        setKey(key + 1);
        setItem('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemove = (id) => {
    handleDelete(id)
      .then(() => {
        setTodoList(
          todoList.filter((item) => id !== item.id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>
        To-Do List
      </h1>

      <p>Hi King! This is Ran, speaking to you from a remote app</p>

      <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>

      <ol>
        {
          todoList.map((item) => (
            <Item
              key={item.id}
              description={item.description}
              handleDelete={() => handleRemove(item.id)}
            />
          ))
        }
      </ol>
    </>
  )
}
