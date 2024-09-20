import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
env.config();

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/testimonial", (req, res) => {
  res.render("testimonial.ejs");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
