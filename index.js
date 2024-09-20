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
  user: process.env.PG_CLIENT_USER,
  database: process.env.PG_CLIENT_DATABASE,
  host: process.env.PG_CLIENT_HOST,
  password: process.env.PG_CLIENT_PASSWORD,
  port: process.env.PG_CLIENT_PORT,
});

db.connect();

async function sendContact(name, email, message) {
  const request = await db.query(
    "INSERT INTO contact_message (name,email_address,message) VALUES ($1,$2,$3) RETURNING email_address",
    [name, email, message]
  );
  return request;
}

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

app.post("/contact", async (req, res) => {
  const name = req.body.name;
  const email = req.body.emailAddress;
  const message = req.body.message;
  try {
    const response = await sendContact(name, email, message);
    console.log(response);
    res.render("contact.ejs", { message: req.body });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
