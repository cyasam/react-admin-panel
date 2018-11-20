const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRoute = require("./routes/api");

const port = process.env.PORT || 5000;
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", apiRoute(router));

app.listen(port, () => console.log(`Listening on port ${port}`));
