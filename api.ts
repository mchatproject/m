import express from "npm:express@4.18.2";
const router = express.Router()
import users from "./users.json" with { type: "json" };
import posts from "./posts.json" with { type: "json" };
// import { json } from "express";
// unused right now!
import editjson from "npm:edit-json-file"

import time from "npm:unix-timestamp";

router.post('/register', (_req, res) => {
  console.log(time.now());
  req.body;
  res.send("done");
});

router.get("/", (_req, res) => {
  res.send("Invalid api service.");
});
router.get("/users", (_req, res) => {
  res.send(users);
});
router.get("/users/:user", (_req, res) => {
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
router.get("/posts", (_req, res) => {
  res.send(posts);
});
router.get("/posts/:post", (_req, res) => {
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
