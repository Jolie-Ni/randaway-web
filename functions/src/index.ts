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
import * as AWS from "aws-sdk";

// Configure AWS SDK for DynamoDB
AWS.config.update({
  region: "us-east-1", // Replace with your AWS region
  accessKeyId: functions.config().aws.access_key_id,
  secretAccessKey: functions.config().aws.secret_access_key,
});

// Create an Express app
const app = express();

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Function to fetch data from DynamoDB
const getLocations = async () => {
  const params = {
    TableName: "instagram_locations",
    ProjectionExpression: "businessName, businessAddress, businessLocation",
    FilterExpression: "isValid = :isValid",
    ExpressionAttributeValues: {
      ":isValid": true,
    },
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    return data.Items; // Return the items fetched from the table
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching data from DynamoDB:", error.message);
      throw new Error(`Could not fetch data from DynamoDB: ${error.message}`);
    } else {
      // If it's not an instance of Error, log the entire error object
      console.error(
        "Unknown error fetching data from DynamoDB:",
        JSON.stringify(error));
      throw new Error(
        "Could not fetch data from DynamoDB due to an unknown error."
      );
    }
  }
};

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
app.get("/locations", async (req, res) => {
  try {
    const result = await getLocations();
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({message: error.message});
    } else {
      res.status(500).json({message: "An unknown error occurred"});
    }
  }
});

app.get("/message", (req, res) => {
  res.json({message: "Hello from nn's firebase function!"});
});

// Export the Express app as a Firebase Cloud Function
export const api = functions.https.onRequest(app);
