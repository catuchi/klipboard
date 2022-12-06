const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const port = process.env.PORT || 5001;

const app = express();
// app.use(express.json());
app.use(morgan("dev"));

app.use("/api/resources", require("./routes/resourceRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
