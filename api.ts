// @deno-types="npm:@types/express@4.17.15"
import express from "npm:express";
import fs from "node:fs";
const router = express.Router();
// import { json } from "express";
// unused right now!

type User = {
  name: string;
  //TODO - add more stuff to the type
};

type Post = {
  // erm, what? posts have names? well ok but that might be a bug
  name: string;
};

const users: User[] = JSON.parse(fs.readFileSync("users.json").toString());
const posts: Post[] = JSON.parse(fs.readFileSync("posts.json").toString());

router.post("/register", (_req, res) => {
  console.log(Date.now()); // testing
  // req.body;
  res.send("done");
});

router.get("/", (_req, res) => {
  res.send("Invalid api service.");
});
router.get("/users", (_req, res) => {
  res.send(users);
});
router.get("/users/:user", (req, res) => {
  if (req?.params?.user) {
    const found = users.find(
      (item) => item.name.toLowerCase() === req.params.user.toLowerCase()
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
router.get("/posts/:post", (req, res) => {
  if (req?.params?.post) {
    // erm, what? posts have names? well ok but that might be a bug
    const found = posts.find(
      (item) => item.name.toLowerCase() === req.params.post.toLowerCase()
    );
    if (found) {
      res.send(found);
    } else {
      res.status(404).send("Desolate. {404}");
    }
  }
});

export default router;
