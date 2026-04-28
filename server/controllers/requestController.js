const pool = require("../config/db");

const getRequests = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM requests ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests" });
  }
};

const createRequest = async (req, res) => {
  try {
    const { title, description, priority, status, assigned_to } = req.body;

    const result = await pool.query(
      `INSERT INTO requests (title, description, priority, status, assigned_to)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, priority, status, assigned_to]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error creating request" });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      "UPDATE requests SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error updating request status" });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM requests WHERE id = $1", [id]);

    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting request" });
  }
};

module.exports = {
  getRequests,
  createRequest,
  updateRequestStatus,
  deleteRequest,
};