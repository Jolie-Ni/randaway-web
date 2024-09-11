/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// functions/src/index.ts

import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

// Create an Express app
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors({origin: true}));

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Custom middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Define routes for the Express app
app.get("/hello", (req, res) => {
  res.json({message: "Hello from Jolie firebase function!"});
});

// Export the Express app as a Firebase Cloud Function
export const api = functions.https.onRequest(app);
