/**
 * App entrypoint.
 */
import express from "express";
import route from "./routes/index";
import setupExpress from "./setup/express";
import handleError from "./shared/middleware/error-handler.middleware";

const app = express();

const PORT = 3000;

//Set up Express
setupExpress(app);

// Set up MongoDB.
require("./setup/mongoose")();

// Set up routes.
app.use("/api", route);

// Global handler
app.use(handleError);

// Start app.
app.listen(PORT, () => {
  console.log(`App now listening on port ${PORT}`);
});

export default app;
