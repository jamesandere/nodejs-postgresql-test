const router = require("express").Router();
const pool = require("../connection");

router.post("/", (req, res) => {
  const { title, description } = req.body;

  pool.query(
    `INSERT INTO posts (title, description) VALUES ($1, $2) RETURNING *`,
    [title, description],
    (err, result) => {
      if (!err) {
        res.status(201).json(result.rows);
      } else {
        res.status(500).json("Could not creaate post");
      }
    }
  );
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(`SELECT * FROM posts WHERE id = $1`, [id], (err, result) => {
    if (!err) {
      res.status(200).json(result.rows);
    } else {
      res.status(500).json("Could not find post");
    }
  });
});

router.get("/", (req, res) => {
  pool.query(`SELECT * FROM posts`, (err, results) => {
    if (!err) {
      res.status(200).json(results.rows);
    } else {
      console.log(err.message);
    }
  });
  pool.end;
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;

  pool.query(
    `UPDATE posts SET title = $1, description = $2 WHERE id = $3`,
    [title, description, id],
    (err, result) => {
      if (!err) {
        res.status(200).json({
          message: "Successfully updated post",
        });
      } else {
        res.status(500).json("Could not update post");
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(`DELETE FROM posts WHERE id = $1`, [id], (err, result) => {
    if (!err) {
      res.status(200).json({
        message: "Successfuly deleted post!",
      });
    } else {
      res.status(500).json({
        message: "Unable to delete post!",
      });
    }
  });
});

module.exports = router;
