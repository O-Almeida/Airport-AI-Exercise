/**
 * Setup Express app.
 */
import { Express } from "express";

const helmet = require("helmet");
const methodOverride = require("method-override");
const express = require("express");

/**
 * Sets up Express app.
 *
 * @param {Object} app  The express app.
 */
export default function setup(app: Express) {
  app.use(helmet());
  app.use(methodOverride());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  return app;
}
