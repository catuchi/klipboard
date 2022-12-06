const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5001;

const app = express();

app.use("/api/resources", require("./routes/resourceRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
