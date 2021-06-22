import express from "express";

const app = express();

app.get("/test", (request, response) => {
  return response.send("Hello World");
});

app.post("/test-post", (request, response) => {
  return response.send("Hello World method post");
});

app.listen(3333, () => {
  console.log("Server is running");
});
