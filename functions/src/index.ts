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

const isEmulator = process.env.FUNCTIONS_EMULATOR === "true";

if (isEmulator) {
  // Load .env file for local development
  import("dotenv").then((dotenv) => dotenv.config());
}

const awsAccessKeyId: string | undefined = isEmulator ?
  process.env.AWS_ACCESS_KEY_ID :
  functions.config().aws?.access_key_id;
const awsSecretAccessKey: string | undefined = isEmulator ?
  process.env.AWS_SECRET_ACCESS_KEY :
  functions.config().aws?.secret_access_key;

// Configure AWS SDK for DynamoDB
AWS.config.update({
  region: "us-east-1", // Replace with your AWS region
  accessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretAccessKey,
});

// Create an Express app
const app = express();

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Function to fetch data from DynamoDB
const getLocations = async () => {
  const params = {
    TableName: "instagram_locations",
    ProjectionExpression:
      "instagram_id,request_id,businessName,businessAddress,businessLocation",
    FilterExpression: "isValid = :isValid AND deleted <> :deleted",
    ExpressionAttributeValues: {
      ":isValid": true,
      ":deleted": true,
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
        JSON.stringify(error),
      );
      throw new Error(
        "Could not fetch data from DynamoDB due to an unknown error.",
      );
    }
  }
};

const deleteLocations = async (locationIds: string[]) => {
  const updatePromises = locationIds.map((locationId) => {
    const segs = locationId.split(":");

    const params = {
      TableName: "instagram_locations",
      Key: {
        instagram_id: segs[0],
        request_id: segs[1],
      },
      UpdateExpression: "set deleted = :deleted",
      ExpressionAttributeValues: {
        ":deleted": true,
      },
    };

    return dynamoDB.update(params).promise();
  });

  try {
    const results = await Promise.all(updatePromises);
    return results;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Error during soft delete data from DynamoDB:",
        error.message,
      );
      throw new Error(`Could not update data in DynamoDB: ${error.message}`);
    } else {
      // If it's not an instance of Error, log the entire error object
      console.error(
        "Unknown error update data in DynamoDB:",
        JSON.stringify(error),
      );
      throw new Error(
        "Could not update data in DynamoDB due to an unknown error.",
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

app.post("/locations", async (req, res) => {
  try {
    const {locationIds} = req.body;
    const result = await deleteLocations(locationIds);
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
