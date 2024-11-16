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
    "INSERT INTO contact_message (contact_name,email_address,contact_message) VALUES ($1,$2,$3) RETURNING email_address",
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

app.get("/admission", (req, res) => {
  res.render("admission.ejs");
});

app.post("/submit", async (req, res) => {
  console.log(req.body);

  const fName = req.body.fName;
  const lName = req.body.lName;
  const homeAddress = req.body.homeAddress;
  const gender = req.body.gender;
  var userLookAlike = false;

  try {
    const request = await db.query(
      "INSERT INTO schooladmisionstudentname (firstname, lastname, homeaddress,gender) VALUES ($1, $2,$3,$4) RETURNING  id",
      [fName, lName, homeAddress, gender]
    );
    try {
      const studentInfo = await db.query(
        "INSERT INTO studentinfo (id , oname, birthdate, age, lga, yourstate, nationality, religion, denomination, schoolattended, lastclass, currentclass, youremailaddress) VALUES ($1, $2,$3, $4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
        [
          request.rows[0].id,
          req.body.oName,
          req.body.birthdate,
          req.body.age,
          req.body.lga,
          req.body.state,
          req.body.nationality,
          req.body.religion,
          req.body.denomination,
          req.body.schoolAttended,
          req.body.lastClass,
          req.body.currentClass,
          req.body.yourEmailAddress,
        ]
      );
      try {
        const studentParentInfo = await db.query(
          "INSERT INTO studentparentinfo (id, fathername, fatheroccupation, mothername, motheroccupation, parentemailaddress, fathernumber, mothernumber, guidannumber, parentaddress, moreinformation) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
          [
            request.rows[0].id,
            req.body.fatherName,
            req.body.fatherOccupation,
            req.body.motherName,
            req.body.motherOccupation,
            req.body.emailAddress,
            req.body.fatherNumber,
            req.body.motherNumber,
            req.body.guidanNumber,
            req.body.parentAddress,
            req.body.moreInformation,
          ]
        );
      } catch (error) {}
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    if (error) {
      userLookAlike = true;
    }
  }

  if (userLookAlike) {
    res.redirect("/login");
  }

  console.log(userLookAlike);
});

app.post("/contact", async (req, res) => {
  const name = req.body.name;
  const email = req.body.emailAddress;
  const message = req.body.message;
  try {
    const response = await sendContact(name, email, message);
    res.render("contact.ejs", { message: response.rows[0].email_address });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
