if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const hotelsRoutes = require("./routes/hotels");

const ExpressError = require("./utils/ExpressError");

const dbUrl =
  process.env.DB_URL || "mongodb://localhost:27017/hotel-reservation-app";

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express();

app.use(express.json());

app.use("/api/hotels", hotelsRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = error;
  res.status(status).send({ message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
