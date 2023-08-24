import conn from '../../../lib/db'

export default async (req, res) => {
  try {
    const query = 'SELECT * FROM users LIMIT 1';
    const result = await conn.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'failed to load data' })
  }
};
