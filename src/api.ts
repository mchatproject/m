// @deno-types="npm:@types/express@4.17.15"
import express from "npm:express";
import * as fs from "jsr:@std/fs"; // have to get an std to check if something exists goddamn
import * as accounts from "./accounts.ts";

const router = express.Router();

type Post = {
  user: string;
  content: string;
  mentions: string[];
}

const loadIfExists = async (name: string, contents: string) => {
  try {
    return await Deno.readTextFile(name);
  } catch {
    await Deno.writeTextFile(name, contents);
    return contents;
  }
};

if (!fs.existsSync("data")) Deno.mkdirSync("data");

const posts: Post[] = JSON.parse(await loadIfExists("data/posts.json", "[]"));
// const logindata: UserCreds[] = JSON.parse(await loadIfExists("data/login.json", "[]"));

router.post("/register", (_req, res) => {
  console.log(Date.now()); // testing
  // req.body;
  res.send("done");
});

router.get("/", (_req, res) => {
  res.send("Invalid api service.");
});
router.get("/users", (_req, res) => {
  res.send(accounts.users);
});
router.get("/users/:user", (req, res) => {
  if (req?.params?.user) {
    const found = Object.entries(accounts.users).find(
      ([_id, user]: [string, accounts.User]) => user.name.toLowerCase() === req.params.user.toLowerCase()
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
    const found = posts.find((item) =>
      item.user.toLowerCase() === req.params.post.toLowerCase()
    );
    if (found) {
      res.send(found);
    } else {
      res.status(404).send("Desolate. {404}");
    }
  }
});

export default router;
