const express = require("express");
const app = express();

const PORT = process.env.port || 3000;

app.use(express.urlencoded({ extended: true }));

//* Middleware
function isAdmin(req, res, next) {
  if (req.query.iam === "admin") {
    next();
    return;
  }
  res.status(401).send(`Kamu bukan admin`);
}

//* Root endpoint
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

//* Setup view engine ejs
app.set("view engine", "ejs");

//! Render html with ejs
app.get("/", (req, res) => {
  res.render("index", {
    name: req.query.name || "Guest",
  });
});

//* Query parameter
//* GET /api/v1/books?author=aris
app.get("/api/v1/books", isAdmin, (req, res) => {
  console.log(req.query);
  res.status(200).send(`Kamu sedang mencari buku yang ditulis oleh ${req.query.author}`);
});

//* Path Parameter
//* GET /api/v1/books/1
app.get("/api/v1/books/:id", isAdmin, (req, res) => {
  console.log(req.params);
  res.status(200).send(`Kamu sedang mencari buku dengan id ${req.params.id}`);
});

//* Request Body
//* POST /api/v1/books
app.post("/api/v1/books", isAdmin, (req, res) => {
  console.log(req.body);
  res.status(200).send(`Terimakasih sudah menambahkan buku di dalam database kami`);
});

//* PUT /api/v1/books/:id
app.put("/api/v1/books/:id", isAdmin, (req, res) => {
  console.log(req.body);
  res.status(200).send(`Sudah diupdate!`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
