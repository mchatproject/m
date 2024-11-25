import express from "npm:express@4.18.2";
const router = express.Router()
import users from "./users.json" assert { type: "json" };
import posts from "./posts.json" assert { type: "json" };
import { json } from "express";
import editjson from "npm:edit-json-file"

import time from "npm:unix-timestamp";

router.post('/register', (req, res) => {
  console.log(time.now());
  req.body;
  res.send("done");
});

router.get("/", (req, res) => {
  res.send("Invalid api service.");
});
router.get("/users", (req, res) => {
  res.send(users);
});
router.get("/users/:user", (req, res) => {
  if (req?.params?.user) {
    const found = users.find((item) =>
      item.name.toLowerCase() === req.params.user.toLowerCase()
    );
    if (found) {
      res.send(found);
    } else {
      res.status(404).send("Desolate. {404}");
    }
  }
});
router.get("/posts", (req, res) => {
  res.send(posts);
});
router.get("/posts/:post", (req, res) => {
  if (req?.params?.post) {
    const found = posts.find((item) =>
      item.name.toLowerCase() === req.params.post.toLowerCase()
    );
    if (found) {
      res.send(found);
    } else {
      res.status(404).send("Desolate. {404}");
    }
  }
});

export default router;