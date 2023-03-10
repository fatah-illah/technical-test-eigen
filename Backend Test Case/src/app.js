const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const router = require("./routes/app");
const borrowRouter = require("./routes/borrow.router");

// Create Table
// const Book = require("./models/book.model");
// const Member = require("./models/member.model");

(async function connectToDatabase() {
  try {
    await db.authenticate();
    console.log("Database connected ...");
    // Create Table
    // await Book.sync();
    // await Member.sync();
  } catch (error) {
    console.error("Error: " + error);
  }
})();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(router);
app.use("/borrow", borrowRouter);

require("./swagger")(app);

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
  console.log(`Swagger docs on http://localhost:${port}/api-docs`);
});
