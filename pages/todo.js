import axios from 'axios';
import Head from 'next/head';
import ToDo from '../components/ToDo';
import { useEffect, useState } from 'react';

export default function Todo() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/api/items')
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCreate = (description) => axios.post('/api/items', { description });

  const handleDelete = (id) => axios.delete('/api/items', { data: { id } });

  return (
    <>
      <Head>
        <title>To-Do List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!loading && (
          <ToDo
            items={items}
            handleCreate={handleCreate}
            handleDelete={handleDelete}
          />
        )}
      </main>
    </>
  )
}
