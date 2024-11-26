// @deno-types="npm:@types/express@4.17.15"
import express from "npm:express";

const app = express();
import api from "./api.ts";

app.use(express.json);

app.use("/api", api);
app.get("/", (_req, res) => {
  res.send("not set up");
  // res.sendFile(`../pages/landing.html`);
});
app.get("/apiref", (_req, res) => {
  res.send("not set up");
  // res.sendFile(`../pages/apiref.html`)
});

app.listen(8000);
