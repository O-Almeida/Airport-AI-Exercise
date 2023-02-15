/**
 * App entrypoint.
 */
import route from "./routes/index";
import bodyParser from "body-parser";

const app = require("express")();

const PORT = 3000;

// Set up Express.
require("./setup/express");

// Set up MongoDB.
require("./setup/mongoose")();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up routes.
app.use("/api", route);

// Start app.
app.listen(PORT, () => {
  console.log(`App now listening on port ${PORT}`);
});

export default app;
