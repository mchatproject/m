// @deno-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";

const app = express();
import api from "./api.ts" ;
app.use("/api", api);
app.get("/", (req, res) => {
  res.sendFile(`/home/runner/mservicereplit/landing/`)
});
app.get("/apiref", (req, res) => {
  res.sendFile(`/home/runner/mservicereplit/apiref.html`)
});

app.listen(8000);
