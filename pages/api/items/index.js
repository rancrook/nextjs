import { sql } from '@vercel/postgres';

export default async (req, res) => {
  if (req.method === 'GET' ) {
    try {
      const result = await sql`SELECT * FROM items;`;

      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load data' })
    }
  } else if (req.method === 'POST') {
    try {
      const result = await sql`INSERT INTO items(description) VALUES(${req.body.description});`;

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to insert data' })
    }
  } else if (req.method === 'DELETE') {
    try {
      const result = await sql`DELETE FROM items WHERE id = ${req.body.id};`;

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete data' })
    }
  }
};
