const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const { errorHandler } = require("../backend/middlewares/errorMiddleware");
const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use("/api/resources", require("./routes/resourceRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/categories", require("./routes/categoryRoutes"));
// app.use("/api/comments", require("./routes/commentRoutes"));
// app.use("/api/likes", require("./routes/likeRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
