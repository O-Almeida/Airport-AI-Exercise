/**
 * App entrypoint.
 */
import route from "./routes/index";

const app = require("express")();

const PORT = 3000;

// Set up Express.
require("./setup/express");

// Set up MongoDB.
require("./setup/mongoose")();

// Set up routes.
app.use("/", route);

// Start app.
app.listen(PORT, () => {
  console.log(`App now listening on port ${PORT}`);
});

export default app;
