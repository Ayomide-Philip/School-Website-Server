import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import pg from "pg";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
env.config();

const db = new pg.Client({
  user: PG_CLIENT_USER,
  database: PG_CLIENT_DATABASE,
  host: PG_CLIENT_HOST,
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/testimonial", (req, res) => {
  res.render("testimonial.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/contact", (req, res) => {
  res.render("contact.ejs", { message: req.body });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
