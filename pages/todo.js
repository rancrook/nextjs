import axios from 'axios';
import Head from 'next/head';
import ToDo from '../components/ToDo';
import { useEffect } from 'react';

export default function Todo() {
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
        <ToDo />
      </main>
    </>
  )
}
