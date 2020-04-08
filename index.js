const express = require("express");

const postsRouter = require("./router");

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);


server.listen(5000, () => {
    console.log("\n*** Server Running on http://localhost:5000 ***\n");
})