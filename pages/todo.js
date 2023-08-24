import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';

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

export default function Todo() {
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

  useEffect(() => {
    axios.get('/api/items')
      .then((response) => {
        console.log(response.data);
      })
  }, []);

  return (
    <>
      <Head>
        <title>To-Do List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          To-Do List
        </h1>

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
      </main>
    </>
  )
}
